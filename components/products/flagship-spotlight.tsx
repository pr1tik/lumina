'use client';

import React, { useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/shopify/utils';
import { ArrowRight, Sparkles, Volume2, ShieldCheck, Cpu, BatteryCharging } from 'lucide-react';

interface FlagshipSpotlightProps {
  product: Product;
}

export function FlagshipSpotlight({ product }: FlagshipSpotlightProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleAddFlagship = () => {
    const variant = product.variants[0];
    if (!variant) return;

    startTransition(async () => {
      await addItem(variant, product);
    });
  };

  return (
    <section className="my-16 md:my-24 rounded-3xl bg-muted/70 border border-border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left: Visual Showcase */}
        <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden bg-popover">
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-6 left-6 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-background/90 backdrop-blur-md text-foreground border border-border/80">
              STUDIO FLAGSHIP • 2026 RELEASE
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between p-4 rounded-xl bg-background/80 backdrop-blur-md border border-border/60">
            <div>
              <p className="text-xs uppercase font-mono text-muted-foreground">Calibrated Geometry</p>
              <p className="text-sm font-semibold text-foreground">Acoustic Resonance Chamber</p>
            </div>
            <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center">
              <Volume2 className="size-4" />
            </div>
          </div>
        </div>

        {/* Right: Technical Mastery & Action */}
        <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              <Sparkles className="size-3.5 text-foreground" />
              <span>Acoustic Architecture</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              {product.title}
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              Engineered from a monolithic block of 6061-T6 aluminum to eliminate micro-vibrations. Featuring twin neodymium drivers and a continuous downward-firing passive radiator for room-filling 360-degree holographic clarity.
            </p>

            {/* Feature Matrix */}
            <div className="grid grid-cols-2 gap-4 pb-8 border-b border-border">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-popover flex items-center justify-center flex-shrink-0 text-foreground">
                  <Cpu className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Lossless DAC</p>
                  <p className="text-[11px] text-muted-foreground">24-bit / 192kHz High-Res streaming</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-popover flex items-center justify-center flex-shrink-0 text-foreground">
                  <BatteryCharging className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">22-Hour Battery</p>
                  <p className="text-[11px] text-muted-foreground">Fast USB-C power delivery</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-xs text-muted-foreground font-mono uppercase block">Studio Allocation</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-foreground">
                  {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base line-through text-muted-foreground font-mono">
                    {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                size="lg"
                disabled={isPending}
                onClick={handleAddFlagship}
                className="flex-1 sm:flex-none px-6 h-12 text-sm font-semibold"
              >
                {isPending ? 'Adding to Bag...' : 'Add to Bag'}
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-5 text-sm"
              >
                <Link href={`/product/${product.handle}`} className="flex items-center gap-1.5">
                  <span>Details</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
