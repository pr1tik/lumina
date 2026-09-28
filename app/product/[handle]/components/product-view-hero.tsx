'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/cart-context';
import { formatPrice } from '@/lib/shopify/utils';
import { Button } from '@/components/ui/button';
import {
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Minus,
  Plus,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface ProductViewHeroProps {
  product: Product;
}

export function ProductViewHero({ product }: ProductViewHeroProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'shipping'>('specs');

  const variants = product.variants.length > 0 ? product.variants : [];
  const currentVariant: ProductVariant | undefined = variants[selectedVariantIndex] || variants[0];

  const images = product.images.length > 0 ? product.images : [product.featuredImage];
  const currentImage = images[selectedImageIndex] || product.featuredImage;

  const colorOption = product.options.find(
    o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour'
  );

  const handleSelectVariant = (index: number) => {
    setSelectedVariantIndex(index);
    if (images[index]) {
      setSelectedImageIndex(index);
    }
  };

  const handleAddToCart = () => {
    if (!currentVariant) return;
    startTransition(async () => {
      for (let i = 0; i < quantity; i++) {
        await addItem(currentVariant, product);
      }
    });
  };

  const handleInstantCheckout = () => {
    if (!currentVariant) return;
    startTransition(async () => {
      await addItem(currentVariant, product);
      router.push('/checkout');
    });
  };

  const unitPrice = parseFloat(
    currentVariant?.price?.amount || product.priceRange.minVariantPrice.amount
  );
  const totalPriceFormatted = (unitPrice * quantity).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      
      {/* Left Column: Interactive Studio Media Gallery */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        
        {/* Main Hero Viewer Frame */}
        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden border border-border bg-popover shadow-sm">
          <Image
            src={currentImage.url}
            alt={currentImage.altText || product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-all duration-500 ease-out"
          />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-background/85 backdrop-blur-md text-foreground border border-border/80">
              {product.modelNumber || 'LUMINA'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-background/85 backdrop-blur-md text-muted-foreground border border-border/80">
              {product.edition || 'BATCH 2026'}
            </span>
          </div>

          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-md border border-border/80 text-foreground flex items-center justify-center hover:bg-background transition-colors"
                title="Previous photograph"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-md border border-border/80 text-foreground flex items-center justify-center hover:bg-background transition-colors"
                title="Next photograph"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Bottom Counter */}
          <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-mono text-muted-foreground">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                  selectedImageIndex === idx
                    ? 'border-foreground ring-2 ring-foreground/40 scale-95'
                    : 'border-border/80 opacity-70 hover:opacity-100 hover:border-foreground/40'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `Angle ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Studio Designer's Note Card */}
        {product.designerNote && (
          <div className="mt-4 p-6 rounded-2xl bg-muted/40 border border-border/80">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
              Industrial Design Rationale
            </span>
            <p className="text-sm italic leading-relaxed text-foreground/90 font-serif">
              {product.designerNote}
            </p>
          </div>
        )}

      </div>

      {/* Right Column: Industrial Buy Box & Specifications */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        <div className="p-6 md:p-8 rounded-3xl bg-muted/60 border border-border flex flex-col gap-5 shadow-sm">
          
          {/* Eyebrow & Ratings */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {product.categoryId} • {product.modelNumber || 'LUM-SERIES'}
            </span>
            <div className="flex items-center gap-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
              <span className="text-xs font-mono font-medium text-muted-foreground ml-1">
                4.9 (42)
              </span>
            </div>
          </div>

          {/* Title & Short Description */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {product.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & In-Stock Status */}
          <div className="flex items-baseline justify-between pt-2 border-t border-border/60">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-bold font-mono text-foreground">
                ${unitPrice.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base line-through text-muted-foreground font-mono">
                  ${parseFloat(product.compareAtPrice.amount).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In Stock ({product.stockCount || 6} ready to dispatch)</span>
            </div>
          </div>

          {/* Tactile Color / Finish Selector */}
          {variants.length > 1 && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Finish: <span className="text-foreground">{currentVariant?.title}</span>
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {variants.length} options
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {variants.map((v, idx) => {
                  const isSelected = selectedVariantIndex === idx;
                  const colorVal = v.selectedOptions[0]?.value || v.title;
                  const colorHex =
                    colorVal.toLowerCase().includes('black')
                      ? '#171717'
                      : colorVal.toLowerCase().includes('white')
                      ? '#f5f5f5'
                      : colorVal.toLowerCase().includes('silver')
                      ? '#d1d5db'
                      : colorVal.toLowerCase().includes('gold')
                      ? '#d4af37'
                      : colorVal.toLowerCase().includes('stone')
                      ? '#9ca3af'
                      : colorVal.toLowerCase().includes('olive')
                      ? '#4d5d34'
                      : colorVal.toLowerCase().includes('sand')
                      ? '#d8c29d'
                      : colorVal.toLowerCase().includes('navy')
                      ? '#1e293b'
                      : colorVal.toLowerCase().includes('terra')
                      ? '#b45309'
                      : '#737373';

                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleSelectVariant(idx)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                        isSelected
                          ? 'border-foreground bg-popover text-foreground ring-1 ring-foreground'
                          : 'border-border/80 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-background'
                      }`}
                    >
                      <span
                        className="size-3.5 rounded-full border border-border/80 flex-shrink-0"
                        style={{ backgroundColor: colorHex }}
                      />
                      <span className="truncate">{v.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Bag */}
          <div className="flex items-center gap-3 pt-2">
            
            {/* Stepper */}
            <div className="flex items-center h-12 rounded-xl border border-border bg-background px-2">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                title="Decrease quantity"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-mono font-semibold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                title="Increase quantity"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            {/* Add to Bag Button */}
            <Button
              type="button"
              size="lg"
              disabled={isPending}
              onClick={handleAddToCart}
              className="flex-1 h-12 font-semibold text-sm flex items-center justify-between px-5"
            >
              <span>{isPending ? 'Securing Item...' : 'Add to Bag'}</span>
              <span className="font-mono">${totalPriceFormatted}</span>
            </Button>
          </div>

          {/* Instant Express Checkout */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleInstantCheckout}
            className="w-full h-11 text-xs font-semibold tracking-wider uppercase border-border hover:bg-muted"
          >
            Express Purchase • Proceed to Checkout
          </Button>

          {/* Dispatch Notice */}
          <div className="p-3.5 rounded-xl bg-background/80 border border-border/60 flex items-start gap-3 text-xs text-muted-foreground">
            <Truck className="size-4 text-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Dispatches Tomorrow via DHL Express</p>
              <p className="text-[11px] mt-0.5 leading-relaxed">
                White-glove insured delivery included on all orders over $250. Full tracking telemetry provided upon courier pickup.
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-center">
            <div className="flex flex-col items-center justify-center p-1">
              <ShieldCheck className="size-4 text-muted-foreground mb-1" />
              <span className="text-[10px] text-muted-foreground leading-tight">2-Year Studio Warranty</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 border-x border-border/60">
              <RotateCcw className="size-4 text-muted-foreground mb-1" />
              <span className="text-[10px] text-muted-foreground leading-tight">30-Day In-Home Trial</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <CheckCircle2 className="size-4 text-emerald-400 mb-1" />
              <span className="text-[10px] text-muted-foreground leading-tight">100% Genuine Certified</span>
            </div>
          </div>

        </div>

        {/* Structured Tabs: Technical Specifications / In The Box / Shipping */}
        <div className="p-6 rounded-3xl bg-muted/40 border border-border flex flex-col gap-4">
          
          <div className="flex items-center gap-2 border-b border-border/80 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'specs'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('box')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'box'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              In The Box
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'shipping'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Delivery & Warranty
            </button>
          </div>

          {/* Tab 1: Specs Table */}
          {activeTab === 'specs' && product.specs && (
            <div className="divide-y divide-border/60 text-xs">
              {product.specs.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between gap-4">
                  <span className="text-muted-foreground font-medium">{item.label}</span>
                  <span className="text-foreground text-right font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: What's In The Box */}
          {activeTab === 'box' && product.inTheBox && (
            <ul className="space-y-2 text-xs text-muted-foreground">
              {product.inTheBox.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-foreground">
                  <span className="text-muted-foreground font-mono font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tab 3: Delivery & Warranty */}
          {activeTab === 'shipping' && (
            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Insured Transit:</strong> All Lumina artifacts are dispatched in custom reinforced foam crates with shock and tilt telemetry monitors.
              </p>
              <p>
                <strong className="text-foreground">30-Day Studio Trial:</strong> If the piece does not harmoniously integrate into your domestic or professional space, return it within 30 days in original packaging for a full refund.
              </p>
              <p>
                <strong className="text-foreground">2-Year Comprehensive Warranty:</strong> Covers manufacturing, optical, and acoustic defects with direct replacement from our New York or Stockholm studios.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
