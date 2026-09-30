import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FeaturedProductLabel } from './featured-product-label';
import { Product } from '@/lib/shopify/types';
import Link from 'next/link';

interface LatestProductCardProps {
  product: Product;
  principal?: boolean;
  className?: string;
  labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function LatestProductCard({
  product,
  principal = false,
  className,
  labelPosition = 'bottom-right',
}: LatestProductCardProps) {
  if (principal) {
    return (
      <div className={cn('min-h-fold flex flex-col relative md:rounded-3xl overflow-hidden shadow-sm', className)}>
        <Link href={`/product/${product.handle}`} className="size-full flex-1 flex flex-col" prefetch>
          <Image
            priority
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width={1000}
            height={1000}
            quality={100}
            className="object-cover size-full flex-1 transition-transform duration-700 hover:scale-105"
          />
        </Link>
        <div className="absolute bottom-0 left-0 grid w-full md:grid-cols-4 gap-6 pointer-events-none p-4 md:p-sides">
          <FeaturedProductLabel
            className="md:col-span-3 md:col-start-2 pointer-events-auto 2xl:col-start-3 2xl:col-span-2 shrink-0 mb-4"
            product={product}
            principal
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden md:rounded-3xl shadow-sm group', className)}>
      <Link href={`/product/${product.handle}`} className="block w-full aspect-square" prefetch>
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={1000}
          height={1000}
          className="object-cover size-full transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div
        className={cn(
          'absolute flex p-4 inset-0 items-end pointer-events-none justify-end',
          labelPosition === 'top-left' && 'md:justify-start md:items-start',
          labelPosition === 'top-right' && 'md:justify-end md:items-start',
          labelPosition === 'bottom-left' && 'md:justify-start md:items-end',
          labelPosition === 'bottom-right' && 'md:justify-end md:items-end'
        )}
      >
        <FeaturedProductLabel className="pointer-events-auto" product={product} />
      </div>
    </div>
  );
}
