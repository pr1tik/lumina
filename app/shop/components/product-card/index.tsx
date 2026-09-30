import React, { Suspense } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/shopify/types';
import { AddToCart, AddToCartButton } from '@/components/cart/add-to-cart';
import { formatPrice } from '@/lib/shopify/utils';
import { VariantSelector } from '../variant-selector';
import { ProductImage } from './product-image';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export const ProductCard = ({ product }: { product: Product }) => {
  const hasNoOptions = product.options.length === 0;
  const hasOneOptionWithOneValue = product.options.length === 1 && product.options[0].values.length === 1;
  const justHasColorOption = product.options.length === 1 && product.options[0].name.toLowerCase() === 'color';

  const renderInCardAddToCart = hasNoOptions || hasOneOptionWithOneValue || justHasColorOption;

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-square bg-muted group overflow-hidden md:rounded-3xl shadow-sm">
      <Link
        href={`/product/${product.handle}`}
        className="block size-full focus-visible:outline-none"
        aria-label={`View details for ${product.title}, price ${product.priceRange.minVariantPrice}`}
        prefetch
      >
        <Suspense fallback={null}>
          <ProductImage product={product} />
        </Suspense>
      </Link>

      {/* Interactive Overlay */}
      <div className="absolute inset-0 p-3 w-full pointer-events-none">
        <div className="flex gap-6 justify-between items-baseline px-4 py-2 w-full font-medium transition-all duration-300 translate-y-0 max-md:hidden group-hover:opacity-0 group-focus-visible:opacity-0 group-hover:-translate-y-full group-focus-visible:-translate-y-full">
          <p className="text-sm uppercase tracking-wider 2xl:text-base text-balance">{product.title}</p>
          <div className="flex gap-2 items-center text-sm uppercase 2xl:text-base">
            {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            {product.compareAtPrice && (
              <span className="line-through opacity-40">
                {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
        </div>

        <div className="flex absolute inset-x-4 bottom-4 flex-col gap-6 px-4 py-5 rounded-2xl transition-all duration-300 pointer-events-none backdrop-blur-xl bg-white/70 dark:bg-black/50 border border-white/20 dark:border-white/10 shadow-xl md:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:translate-y-1/3 group-hover:translate-y-0 group-focus-visible:translate-y-0 group-hover:pointer-events-auto group-focus-visible:pointer-events-auto max-md:pointer-events-auto">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 items-end">
            <p className="text-lg font-light tracking-tight text-pretty">{product.title}</p>
            <div className="flex gap-2 items-center place-self-end text-lg font-light">
              {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
              {product.compareAtPrice && (
                <span className="text-sm line-through opacity-40">
                  {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
                </span>
              )}
            </div>
            {renderInCardAddToCart ? (
              <Suspense fallback={null}>
                <div className="self-center">
                  <VariantSelector product={product} />
                </div>
              </Suspense>
            ) : (
              <></>
            )}

            {renderInCardAddToCart ? (
              <Suspense fallback={<AddToCartButton className="col-start-2 rounded-full font-medium" product={product} size="sm" />}>
                <AddToCart className="col-start-2 rounded-full font-medium" size="sm" product={product} />
              </Suspense>
            ) : (
              <Button className="col-start-2 rounded-full font-medium" size="sm" variant="default" asChild>
                <Link href={`/product/${product.handle}`}>
                  <div className="flex justify-between items-center w-full px-2">
                    <span>View Product</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
