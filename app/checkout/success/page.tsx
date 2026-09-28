'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Printer,
  Calendar,
  Truck,
  ShieldCheck,
  Mail,
  Home,
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId') || 'LUM-849281';
  const email = searchParams.get('email') || 'client@domain.com';
  const name = searchParams.get('name') || 'Valued Collector';
  const total = searchParams.get('total') || '340.00';
  const itemsCount = searchParams.get('items') || '1';

  // Calculate estimated arrival (4 business days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-sides py-4 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tighter uppercase hover:opacity-80 transition-opacity flex items-center gap-2">
            <span>LUMINA</span>
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono font-normal">STUDIO</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
              className="text-xs flex items-center gap-1.5"
            >
              <Printer className="size-3.5" />
              <span>Print Order</span>
            </Button>
            <Button asChild size="sm">
              <Link href="/shop" className="text-xs flex items-center gap-1.5">
                <Home className="size-3.5" />
                <span>Shop</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-sides py-12 md:py-16">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
            <CheckCircle2 className="size-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2 font-mono">
            Payment Authorized & Confirmed
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Thank you for your order, {name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
            Your order has been recorded in our dispatch ledger. A detailed confirmation receipt has been sent to{' '}
            <span className="text-foreground font-medium font-mono">{email}</span>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-muted border border-border rounded-xl p-6 md:p-8 flex flex-col gap-8 shadow-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <p className="text-xs uppercase text-muted-foreground font-mono font-medium">Order Reference</p>
              <p className="text-xl font-bold font-mono tracking-tight text-foreground mt-0.5">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-muted-foreground font-mono font-medium">Total Paid</p>
              <p className="text-xl font-bold tracking-tight text-foreground mt-0.5">${total}</p>
            </div>
          </div>

          {/* Stepper Status */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">
              Dispatch & Fulfillment Status
            </h3>
            <div className="grid grid-cols-4 gap-2 relative">
              <div className="flex flex-col items-center text-center">
                <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold mb-2">
                  ✓
                </div>
                <span className="text-xs font-medium text-foreground">Order Placed</span>
                <span className="text-[10px] text-muted-foreground">Just now</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="size-8 rounded-full bg-foreground/20 text-foreground border border-foreground/40 flex items-center justify-center text-xs font-bold mb-2 animate-pulse">
                  2
                </div>
                <span className="text-xs font-medium text-foreground">Studio Prep</span>
                <span className="text-[10px] text-muted-foreground">In progress</span>
              </div>

              <div className="flex flex-col items-center text-center opacity-40">
                <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold mb-2">
                  3
                </div>
                <span className="text-xs font-medium text-foreground">Quality Check</span>
                <span className="text-[10px] text-muted-foreground">Pending</span>
              </div>

              <div className="flex flex-col items-center text-center opacity-40">
                <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold mb-2">
                  4
                </div>
                <span className="text-xs font-medium text-foreground">Out for Delivery</span>
                <span className="text-[10px] text-muted-foreground">Est. {formattedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Logistics & Delivery Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-lg bg-popover flex items-center justify-center flex-shrink-0 text-foreground">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Estimated Delivery</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{formattedDelivery}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Tracked with White-Glove Insurance</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-lg bg-popover flex items-center justify-center flex-shrink-0 text-foreground">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Customer Notification</p>
                <p className="text-sm font-medium text-foreground mt-0.5 truncate max-w-[200px]">{email}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Tracking link sent upon courier pickup</p>
              </div>
            </div>
          </div>

          {/* Quality Guarantee Box */}
          <div className="p-4 rounded-lg bg-popover border border-border flex items-start gap-3">
            <ShieldCheck className="size-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-0.5">Complimentary 2-Year Studio Warranty</p>
              Every Lumina design artifact is covered against manufacturing defects with zero deductibles. If you have any inquiries regarding your shipment, reach out directly to{' '}
              <span className="text-foreground underline">concierge@luminastudio.com</span>.
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto px-8">
            <Link href="/shop" className="flex items-center gap-2">
              <span>Continue Shopping</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8"
          >
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>

      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
