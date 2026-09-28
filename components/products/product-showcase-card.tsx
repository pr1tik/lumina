'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/cart-context';
import { formatPrice } from '@/lib/shopify/utils';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface ProductShowcaseCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductShowcaseCard({ product, priority = false }: ProductShowcaseCardProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const images = product.images.length > 0 ? product.images : [product.featuredImage];
  const activeImage = images[selectedColorIndex] || product.featuredImage;

  const colorOption = product.options.find(
    o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour'
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedVariant = product.variants[selectedColorIndex] || product.variants[0];
    if (!selectedVariant) return;

    startTransition(async () => {
      await addItem(selectedVariant, product);
    });
  };

  return (
    <div className="group relative flex flex-col bg-muted/60 rounded-2xl overflow-hidden border border-border/70 hover:border-foreground/30 transition-all duration-300">
      
      {/* Product Image Frame */}
      <Link
        href={`/product/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden bg-popover block"
        prefetch
      >
        <Image
          src={activeImage.url}
          alt={activeImage.altText || product.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-background/80 backdrop-blur-md text-foreground border border-border/60">
            {product.categoryId || 'Design'}
          </span>
        </div>

        {/* Quick Add Overlay Button on Desktop */}
        <button
          type="button"
          onClick={handleQuickAdd}
          disabled={isPending}
          className="absolute bottom-3 right-3 z-10 size-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Quick add to bag"
        >
          {isPending ? (
            <div className="size-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="size-5" />
          )}
        </button>
      </Link>

      {/* Info Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Color swatches preview if available */}
          {colorOption && colorOption.values.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              {colorOption.values.map((val, idx) => (
                <button
                  key={val.id}
                  type="button"
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`size-3.5 rounded-full border transition-all ${
                    selectedColorIndex === idx
                      ? 'ring-2 ring-foreground scale-110 border-transparent'
                      : 'border-border/80 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor:
                      val.name.toLowerCase() === 'black'
                        ? '#171717'
                        : val.name.toLowerCase() === 'white'
                        ? '#fafafa'
                        : val.name.toLowerCase() === 'silver'
                        ? '#d4d4d8'
                        : val.name.toLowerCase() === 'gold'
                        ? '#d4af37'
                        : val.name.toLowerCase() === 'stone'
                        ? '#a1a1aa'
                        : val.name.toLowerCase() === 'olive'
                        ? '#556b2f'
                        : val.name.toLowerCase() === 'sand'
                        ? '#e5d3b3'
                        : val.name.toLowerCase() === 'navy'
                        ? '#1e293b'
                        : val.name.toLowerCase() === 'terracotta'
                        ? '#c86446'
                        : val.name.toLowerCase() === 'green'
                        ? '#2e4f3c'
                        : val.name.toLowerCase() === 'brown'
                        ? '#6d4c41'
                        : val.name.toLowerCase() === 'tan'
                        ? '#d2b48c'
                        : '#737373',
                  }}
                  title={`Color: ${val.name}`}
                />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1 font-mono">
                {colorOption.values[selectedColorIndex]?.name}
              </span>
            </div>
          )}

          <Link href={`/product/${product.handle}`} className="block group-hover:underline">
            <h3 className="text-base font-bold text-foreground line-clamp-1">{product.title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Mobile Add Button */}
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
            <span>Details</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

      </div>

    </div>
  );
}
