'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/cart-context';
import { formatPrice } from '@/lib/shopify/utils';
import { Plus, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const images = product.images.length > 0 ? product.images : [product.featuredImage];
  const currentImage = images[activeVariantIndex] || product.featuredImage;

  const colorOption = product.options.find(
    o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour'
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedVariant = product.variants[activeVariantIndex] || product.variants[0];
    if (!selectedVariant) return;

    startTransition(async () => {
      await addItem(selectedVariant, product);
    });
  };

  return (
    <div className="group relative flex flex-col bg-muted/50 rounded-2xl overflow-hidden border border-border/80 hover:border-foreground/40 transition-all duration-300 shadow-sm">
      
      {/* Product Image Frame */}
      <Link
        href={`/product/${product.handle}`}
        className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-popover block"
        prefetch
      >
        <Image
          src={currentImage.url}
          alt={currentImage.altText || product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
          {product.modelNumber ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-background/85 backdrop-blur-md text-foreground border border-border/60">
              {product.modelNumber}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-background/85 backdrop-blur-md text-foreground border border-border/60">
              {product.categoryId}
            </span>
          )}

          {product.compareAtPrice && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-foreground text-background">
              SPECIAL
            </span>
          )}
        </div>

        {/* Quick Add Overlay on Desktop */}
        <button
          type="button"
          onClick={handleQuickAdd}
          disabled={isPending}
          className="absolute bottom-3 right-3 z-10 size-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Quick add to bag"
        >
          {isPending ? (
            <div className="size-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="size-5" />
          )}
        </button>
      </Link>

      {/* Product Details Under Image */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-muted/40">
        <div>
          {/* Color swatch selector */}
          {colorOption && colorOption.values.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {colorOption.values.map((val, idx) => (
                <button
                  key={val.id}
                  type="button"
                  onClick={() => setActiveVariantIndex(idx)}
                  className={`size-3 rounded-full border transition-all ${
                    activeVariantIndex === idx
                      ? 'ring-2 ring-foreground scale-110 border-transparent'
                      : 'border-border/80 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor:
                      val.name.toLowerCase().includes('black')
                        ? '#171717'
                        : val.name.toLowerCase().includes('white')
                        ? '#f5f5f5'
                        : val.name.toLowerCase().includes('silver')
                        ? '#d1d5db'
                        : val.name.toLowerCase().includes('gold')
                        ? '#d4af37'
                        : val.name.toLowerCase().includes('stone')
                        ? '#9ca3af'
                        : val.name.toLowerCase().includes('olive')
                        ? '#4d5d34'
                        : val.name.toLowerCase().includes('sand')
                        ? '#d8c29d'
                        : val.name.toLowerCase().includes('navy')
                        ? '#1e293b'
                        : val.name.toLowerCase().includes('terra')
                        ? '#b45309'
                        : val.name.toLowerCase().includes('green')
                        ? '#1b4332'
                        : '#737373',
                  }}
                  title={val.name}
                />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1 font-mono">
                {colorOption.values[activeVariantIndex]?.name}
              </span>
            </div>
          )}

          <Link href={`/product/${product.handle}`} className="block group-hover:underline">
            <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-1">{product.title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold font-mono">
              {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs line-through text-muted-foreground font-mono">
                {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isPending}
            className="md:hidden text-xs font-semibold px-3 py-1.5 rounded-full bg-foreground text-background flex items-center gap-1"
          >
            {isPending ? 'Adding...' : 'Add +'}
          </button>

          <Link
            href={`/product/${product.handle}`}
            className="hidden md:flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Inspect</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

      </div>

    </div>
  );
}
