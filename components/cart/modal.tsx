'use client';

import { ArrowRight, PlusCircleIcon, Sparkles, Check, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useCart } from './cart-context';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Loader } from '../ui/loader';
import { CartItemCard } from './cart-item';
import { formatPrice } from '@/lib/shopify/utils';
import { useBodyScrollLock } from '@/lib/hooks/use-body-scroll-lock';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Cart } from '../../lib/shopify/types';

const CartContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('px-3 md:px-4', className)}>{children}</div>;
};

const FREE_SHIPPING_THRESHOLD = 250;

const CartItems = ({ closeCart }: { closeCart: () => void }) => {
  const { cart } = useCart();

  if (!cart) return <></>;

  const subtotalNum = cart.cost?.totalAmount?.amount ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const progressPercent = Math.min(100, Math.round((subtotalNum / FREE_SHIPPING_THRESHOLD) * 100));
  const diffRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalNum);

  return (
    <div className="flex flex-col justify-between h-full overflow-hidden">
      {/* Free Shipping Progress Bar */}
      <CartContainer className="mb-2">
        <div className="p-3 rounded-lg bg-popover/80 border border-border/60">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5 text-foreground" />
              {diffRemaining === 0 ? (
                <span className="text-emerald-400 font-semibold">Free Insured Shipping unlocked!</span>
              ) : (
                <span>Add ${diffRemaining.toFixed(2)} more for Free Shipping</span>
              )}
            </span>
            <span className="text-muted-foreground font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                diffRemaining === 0 ? 'bg-emerald-400' : 'bg-foreground'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </CartContainer>

      <CartContainer className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground font-mono font-medium">
        <span>Items in Bag</span>
        <span>{cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}</span>
      </CartContainer>

      <div className="relative flex-1 min-h-0 py-3 overflow-x-hidden">
        <CartContainer className="overflow-y-auto flex flex-col gap-y-3 h-full scrollbar-hide">
          <AnimatePresence>
            {cart.lines.map(item => (
              <motion.div
                key={item.merchandise.id}
                layout
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <CartItemCard item={item} onCloseCart={closeCart} />
              </motion.div>
            ))}
          </AnimatePresence>
        </CartContainer>
      </div>

      <CartContainer>
        <div className="py-3 text-sm text-foreground/70 shrink-0">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-muted-foreground/20 text-xs">
            <p>Estimated Taxes</p>
            <p className="text-right text-muted-foreground">Calculated at checkout</p>
          </div>
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-muted-foreground/20 text-xs">
            <p>Insured Shipping</p>
            <p className="text-right font-medium text-foreground">
              {diffRemaining === 0 ? <span className="text-emerald-400">FREE</span> : 'Calculated at checkout'}
            </p>
          </div>
          <div className="flex justify-between items-center pt-1 pb-1 mb-2 text-base font-semibold">
            <p>Subtotal</p>
            <p className="text-lg text-right text-foreground font-bold font-mono">
              {formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
            </p>
          </div>
        </div>

        <CheckoutButton closeCart={closeCart} />
      </CartContainer>
    </div>
  );
};

const serializeCart = (cart: Cart) => {
  return JSON.stringify(
    cart.lines.map(line => ({
      merchandiseId: line.merchandise.id,
      quantity: line.quantity,
    }))
  );
};

export default function CartModal() {
  const { isPending, cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const serializedCart = useRef(cart ? serializeCart(cart) : undefined);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!cart || isPending) return;

    const newSerializedCart = serializeCart(cart);

    // Initialize on first load
    if (serializedCart.current === undefined) {
      serializedCart.current = newSerializedCart;
      return;
    }

    // Only open cart if items were actually added/changed
    if (serializedCart.current !== newSerializedCart) {
      serializedCart.current = newSerializedCart;
      setIsOpen(true);
    }
  }, [cart, isPending]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const renderCartContent = () => {
    if (!cart || cart.lines.length === 0) {
      return (
        <CartContainer className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="size-16 rounded-full bg-popover flex items-center justify-center mb-4 text-muted-foreground border border-border">
            <PlusCircleIcon className="size-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Your Bag is Empty</h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed">
            Discover our curated catalogue of architectural lighting, acoustics, and timeless design objects.
          </p>
          <Button asChild size="default" onClick={closeCart}>
            <Link href="/shop">Start Browsing</Link>
          </Button>
        </CartContainer>
      );
    }

    return <CartItems closeCart={closeCart} />;
  };

  return (
    <>
      <Button aria-label="Open cart" onClick={openCart} className="uppercase font-semibold tracking-wide" size={'sm'}>
        <span className="max-md:hidden">cart</span> ({cart?.totalQuantity || 0})
      </Button>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={closeCart}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 bottom-0 right-0 flex w-full md:w-[500px] p-modal-sides z-50"
            >
              <div className="flex flex-col py-3 w-full rounded-xl bg-muted border border-border/80 md:py-4 shadow-2xl">
                <CartContainer className="flex justify-between items-baseline mb-6">
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold tracking-tight">Shopping Bag</p>
                    <span className="text-xs text-muted-foreground font-mono">
                      ({cart?.totalQuantity || 0})
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" aria-label="Close cart" onClick={closeCart}>
                    Close
                  </Button>
                </CartContainer>

                {renderCartContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CheckoutButton({ closeCart }: { closeCart: () => void }) {
  const { pending } = useFormStatus();
  const { cart, isPending } = useCart();
  const router = useRouter();

  const checkoutUrl = cart?.checkoutUrl || '/checkout';
  const isLoading = pending;
  const isDisabled = !cart || cart.lines.length === 0 || isPending;

  return (
    <Button
      type="button"
      disabled={isDisabled}
      size="lg"
      className="flex relative gap-3 justify-between items-center w-full font-semibold"
      onClick={() => {
        closeCart();
        router.push(checkoutUrl);
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={isLoading ? 'loading' : 'content'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex justify-center items-center w-full"
        >
          {isLoading ? (
            <Loader size="default" />
          ) : (
            <div className="flex justify-between items-center w-full">
              <span>Proceed to Checkout</span>
              <ArrowRight className="size-5" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
