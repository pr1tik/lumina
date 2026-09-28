'use client';

import { Collection, Product } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { ShopBreadcrumb } from './shop-breadcrumb';
import { ResultsCount } from './results-count';
import { SortDropdown } from './sort-dropdown';
import { Search, X } from 'lucide-react';
import { useQueryState, parseAsString } from 'nuqs';

export default function ResultsControls({
  collections,
  products,
  className,
}: {
  collections: Pick<Collection, 'handle' | 'title'>[];
  products: Product[];
  className?: string;
}) {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-4 mb-3 w-full pr-sides', className)}>
      {/* Breadcrumb & count */}
      <div className="flex items-center gap-4">
        <ShopBreadcrumb collections={collections} className="ml-1" />
        <ResultsCount count={products.length} />
      </div>

      {/* Quick Search & Sort */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <Search className="size-3.5 absolute left-2.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={search}
            onChange={e => setSearch(e.target.value || null)}
            className="h-8 pl-8 pr-7 text-xs rounded-md bg-muted/80 border border-border/60 placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 w-36 sm:w-48 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch(null)}
              className="absolute right-2 text-muted-foreground hover:text-foreground"
              title="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <SortDropdown />
      </div>
    </div>
  );
}
