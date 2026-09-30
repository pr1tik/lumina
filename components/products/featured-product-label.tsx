import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/shopify/types';
import { AddToCart, AddToCartButton } from '../cart/add-to-cart';
import { Suspense } from 'react';
import Link from 'next/link';

export function FeaturedProductLabel({
  product,
  principal = false,
  className,
}: {
  product: Product;
  principal?: boolean;
  className?: string;
}) {
  if (principal) {
    return (
      <div
        className={cn(
          'flex flex-col grid-cols-2 gap-y-3 p-6 w-full backdrop-blur-xl bg-white/70 dark:bg-black/50 border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl md:w-fit md:grid transition-all hover:shadow-3xl',
          className
        )}
      >
        <div className="col-span-2">
          <Badge className="font-black capitalize rounded-full tracking-widest text-xs px-3 py-1 bg-foreground text-background">Featured</Badge>
        </div>
        <Link href={`/product/${product.handle}`} className="col-span-1 self-start text-3xl font-light tracking-tight hover:opacity-70 transition-opacity">
          {product.title}
        </Link>
        <div className="col-span-1 mb-8">
          {product.tags.length > 0 ? (
            <p className="mb-3 text-xs tracking-widest uppercase text-neutral-500 font-semibold">{product.tags.join(' • ')}</p>
          ) : null}
          <p className="text-sm font-medium line-clamp-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex col-span-1 gap-4 items-center text-3xl font-light md:self-end">
          ${Number(product.priceRange.minVariantPrice.amount)}
          {product.compareAtPrice && (
            <span className="line-through text-lg opacity-40">${Number(product.compareAtPrice.amount)}</span>
          )}
        </div>
        <Suspense
          fallback={<AddToCartButton className="flex gap-16 justify-between pr-2 rounded-full font-medium" size="lg" product={product} />}
        >
          <AddToCart className="flex gap-16 justify-between pr-2 rounded-full font-medium" size="lg" product={product} />
        </Suspense>
      </div>
    );
  }
  return (
    <div className={cn('flex gap-3 items-center p-3 pl-6 backdrop-blur-xl bg-white/70 dark:bg-black/50 border border-white/20 dark:border-white/10 shadow-xl rounded-full w-[calc(100%-1rem)] sm:w-auto sm:max-w-md', className)}>
      <div className="flex-1 min-w-0 pr-2 leading-snug">
        <Link
          href={`/product/${product.handle}`}
          className="block w-full truncate text-sm font-medium hover:opacity-70 transition-opacity mb-1"
        >
          {product.title}
        </Link>
        <div className="flex gap-2 items-center text-sm font-semibold">
          ${Number(product.priceRange.minVariantPrice.amount)}
          {product.compareAtPrice && (
            <span className="text-xs line-through opacity-40">${Number(product.compareAtPrice.amount)}</span>
          )}
        </div>
      </div>
      <Suspense fallback={<AddToCartButton product={product} iconOnly variant="default" size="icon" className="rounded-full" />}>
        <AddToCart product={product} iconOnly variant="default" size="icon" className="rounded-full" />
      </Suspense>
    </div>
  );
}
