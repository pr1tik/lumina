'use client';

import React, { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collection } from '@/lib/shopify/types';
import Link from 'next/link';
import { CategoryFilter } from './category-filter';
import { ColorFilter } from './color-filter';
import { useProducts } from '../providers/products-provider';
import { useFilterCount } from '../hooks/use-filter-count';

export function DesktopFilters({ collections, className }: { collections: Collection[]; className?: string }) {
  const { originalProducts } = useProducts();
  const filterCount = useFilterCount();

  return (
    <aside className={cn('sticky top-24 self-start flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-baseline">
          <h2 className="text-xl font-bold tracking-tight">
            Filters {filterCount > 0 && <span className="text-muted-foreground text-sm font-normal">({filterCount})</span>}
          </h2>
          {filterCount > 0 && (
            <Button
              size={'sm'}
              variant="ghost"
              aria-label="Clear all filters"
              className="h-7 text-xs font-medium text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/shop" prefetch>
                Clear all
              </Link>
            </Button>
          )}
        </div>
        <Suspense fallback={null}>
          <CategoryFilter collections={collections} />
          <ColorFilter products={originalProducts} />
        </Suspense>
      </div>
    </aside>
  );
}
