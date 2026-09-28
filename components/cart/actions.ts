'use server';

import { TAGS } from '@/lib/constants';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import {
  createCart as createShopifyCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  getCart as getShopifyCart,
} from '@/lib/shopify/shopify';
import type { Cart, CartItem, Product, ProductVariant, ShopifyCart, ShopifyCartLine } from '@/lib/shopify/types';
import { MOCK_PRODUCTS } from '@/lib/shopify/mock';

const hasShopifyConfig = Boolean(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
const CART_COOKIE = 'lumina_cart_session';

function getEmptyCart(): Cart {
  return {
    id: 'cart_' + Math.random().toString(36).substring(2, 9),
    checkoutUrl: '/checkout',
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' },
    },
    totalQuantity: 0,
    lines: [],
  };
}

async function getLocalCartFromCookies(): Promise<Cart> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(CART_COOKIE)?.value;
    if (!raw) return getEmptyCart();
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.lines)) {
      parsed.checkoutUrl = '/checkout';
      return parsed;
    }
  } catch (e) {
    // ignore parse error
  }
  return getEmptyCart();
}

async function saveLocalCartToCookies(cart: Cart): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(CART_COOKIE, JSON.stringify(cart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  } catch (error) {
    console.error('Error saving cart to cookies:', error);
  }
}

// Local adapter utilities to return FE Cart (avoid cyclic deps)
function adaptCartLine(shopifyLine: ShopifyCartLine): CartItem {
  const merchandise = shopifyLine.merchandise;
  const product = merchandise.product;

  return {
    id: shopifyLine.id,
    quantity: shopifyLine.quantity,
    cost: {
      totalAmount: {
        amount: (parseFloat(merchandise.price.amount) * shopifyLine.quantity).toString(),
        currencyCode: merchandise.price.currencyCode,
      },
    },
    merchandise: {
      id: merchandise.id,
      title: merchandise.title,
      selectedOptions: merchandise.selectedOptions || [],
      product: {
        id: product.title,
        title: product.title,
        handle: product.handle,
        categoryId: undefined,
        description: '',
        descriptionHtml: '',
        featuredImage: product.images?.edges?.[0]?.node
          ? {
              ...product.images.edges[0].node,
              altText: product.images.edges[0].node.altText || product.title,
              height: 600,
              width: 600,
              thumbhash: product.images.edges[0].node.thumbhash || undefined,
            }
          : { url: '', altText: '', height: 0, width: 0 },
        currencyCode: merchandise.price.currencyCode,
        priceRange: {
          minVariantPrice: merchandise.price,
          maxVariantPrice: merchandise.price,
        },
        compareAtPrice: undefined,
        seo: { title: product.title, description: '' },
        options: [],
        tags: [],
        variants: [],
        images:
          product.images?.edges?.map((edge: any) => ({
            ...edge.node,
            altText: edge.node.altText || product.title,
            height: 600,
            width: 600,
          })) || [],
        availableForSale: true,
      },
    },
  } satisfies CartItem;
}

function adaptCart(shopifyCart: ShopifyCart | null): Cart | null {
  if (!shopifyCart) return null;

  const lines = shopifyCart.lines?.edges?.map((edge: any) => adaptCartLine(edge.node)) || [];

  return {
    id: shopifyCart.id,
    checkoutUrl: '/checkout',
    cost: {
      subtotalAmount: shopifyCart.cost.subtotalAmount,
      totalAmount: shopifyCart.cost.totalAmount,
      totalTaxAmount: shopifyCart.cost.totalTaxAmount,
    },
    totalQuantity: lines.reduce((sum: number, line: CartItem) => sum + line.quantity, 0),
    lines,
  } satisfies Cart;
}

async function getOrCreateCartId(): Promise<string> {
  let cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) {
    const newCart = await createShopifyCart();
    cartId = newCart.id;
    (await cookies()).set('cartId', cartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return cartId;
}

// Add item server action: returns adapted Cart
export async function addItem(
  variantId: string | undefined,
  variantData?: ProductVariant,
  productData?: Product
): Promise<Cart | null> {
  if (!variantId) return null;

  if (hasShopifyConfig) {
    try {
      const cartId = await getOrCreateCartId();
      await addCartLines(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
      const fresh = await getShopifyCart(cartId);
      revalidateTag(TAGS.cart);
      return adaptCart(fresh);
    } catch (error) {
      console.warn('Shopify addItem failed, falling back to local cart:', error);
    }
  }

  // Local cart fallback
  const cart = await getLocalCartFromCookies();
  let variant = variantData;
  let product = productData;

  if (!variant || !product) {
    for (const p of MOCK_PRODUCTS) {
      const v = p.variants.find(item => item.id === variantId) || (p.id === variantId ? p.variants[0] : null);
      if (v) {
        variant = v;
        product = p;
        break;
      }
    }
  }

  if (!variant || !product) {
    return cart;
  }

  const existingIndex = cart.lines.findIndex(l => l.merchandise.id === variant!.id);

  if (existingIndex > -1) {
    const line = cart.lines[existingIndex];
    const newQty = line.quantity + 1;
    const unitPrice = parseFloat(variant.price.amount);
    cart.lines[existingIndex] = {
      ...line,
      quantity: newQty,
      cost: {
        totalAmount: {
          amount: (unitPrice * newQty).toFixed(2),
          currencyCode: variant.price.currencyCode,
        },
      },
    };
  } else {
    const unitPrice = parseFloat(variant.price.amount);
    const newLine: CartItem = {
      id: `line_${variant.id}_${Date.now()}`,
      quantity: 1,
      cost: {
        totalAmount: {
          amount: unitPrice.toFixed(2),
          currencyCode: variant.price.currencyCode,
        },
      },
      merchandise: {
        id: variant.id,
        title: variant.title,
        selectedOptions: variant.selectedOptions || [],
        product,
      },
    };
    cart.lines.unshift(newLine);
  }

  const subtotal = cart.lines.reduce((acc, l) => acc + parseFloat(l.cost.totalAmount.amount), 0);
  const totalQty = cart.lines.reduce((acc, l) => acc + l.quantity, 0);

  cart.totalQuantity = totalQty;
  cart.checkoutUrl = '/checkout';
  cart.cost = {
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
    totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
    totalTaxAmount: { amount: '0', currencyCode: 'USD' },
  };

  await saveLocalCartToCookies(cart);
  revalidateTag(TAGS.cart);
  return cart;
}

// Update item server action (quantity 0 removes): returns adapted Cart
export async function updateItem({ lineId, quantity }: { lineId: string; quantity: number }): Promise<Cart | null> {
  if (hasShopifyConfig) {
    try {
      const cartId = (await cookies()).get('cartId')?.value;
      if (cartId) {
        if (quantity === 0) {
          await removeCartLines(cartId, [lineId]);
        } else {
          await updateCartLines(cartId, [{ id: lineId, quantity }]);
        }

        const fresh = await getShopifyCart(cartId);
        revalidateTag(TAGS.cart);
        return adaptCart(fresh);
      }
    } catch (error) {
      console.warn('Shopify updateItem failed, falling back to local cart:', error);
    }
  }

  const cart = await getLocalCartFromCookies();

  if (quantity <= 0) {
    cart.lines = cart.lines.filter(l => l.id !== lineId && l.merchandise.id !== lineId);
  } else {
    const line = cart.lines.find(l => l.id === lineId || l.merchandise.id === lineId);
    if (line) {
      const unitPrice = parseFloat(line.cost.totalAmount.amount) / line.quantity;
      line.quantity = quantity;
      line.cost = {
        totalAmount: {
          amount: (unitPrice * quantity).toFixed(2),
          currencyCode: line.cost.totalAmount.currencyCode,
        },
      };
    }
  }

  const subtotal = cart.lines.reduce((acc, l) => acc + parseFloat(l.cost.totalAmount.amount), 0);
  const totalQty = cart.lines.reduce((acc, l) => acc + l.quantity, 0);

  cart.totalQuantity = totalQty;
  cart.checkoutUrl = '/checkout';
  cart.cost = {
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
    totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
    totalTaxAmount: { amount: '0', currencyCode: 'USD' },
  };

  await saveLocalCartToCookies(cart);
  revalidateTag(TAGS.cart);
  return cart;
}

export async function clearCart(): Promise<Cart> {
  const empty = getEmptyCart();
  await saveLocalCartToCookies(empty);
  revalidateTag(TAGS.cart);
  return empty;
}

export async function createCartAndSetCookie() {
  if (hasShopifyConfig) {
    try {
      const newCart = await createShopifyCart();
      (await cookies()).set('cartId', newCart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return newCart;
    } catch (error) {
      console.warn('Shopify createCart failed, falling back to local cart');
    }
  }

  const cart = getEmptyCart();
  await saveLocalCartToCookies(cart);
  return cart;
}

export async function getCart(): Promise<Cart | null> {
  if (hasShopifyConfig) {
    try {
      const cartId = (await cookies()).get('cartId')?.value;
      if (cartId) {
        const fresh = await getShopifyCart(cartId);
        if (fresh) return adaptCart(fresh);
      }
    } catch (error) {
      console.warn('Shopify getCart failed, falling back to local cart');
    }
  }

  const cart = await getLocalCartFromCookies();
  cart.checkoutUrl = '/checkout';
  return cart;
}
