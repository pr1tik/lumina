import { DesktopFilters } from './components/shop-filters';
import { Suspense } from 'react';
import { getCollections } from '@/lib/shopify';
import { PageLayout } from '@/components/layout/page-layout';
import { MobileFilters } from './components/mobile-filters';
import { ProductsProvider } from './providers/products-provider';

// Enable ISR with 1 minute revalidation for the layout
export const revalidate = 60;

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const collections = await getCollections();

  return (
    <PageLayout>
      <ProductsProvider>
        <div className="max-w-7xl mx-auto w-full px-sides py-6 md:py-10">
          <div className="flex flex-col md:grid grid-cols-12 md:gap-8">
            <Suspense fallback={null}>
              <DesktopFilters collections={collections} className="col-span-3 max-md:hidden" />
            </Suspense>
            <Suspense fallback={null}>
              <MobileFilters collections={collections} />
            </Suspense>
            <div className="col-span-12 md:col-span-9 flex flex-col h-full">
              <Suspense fallback={null}>{children}</Suspense>
            </div>
          </div>
        </div>
      </ProductsProvider>
    </PageLayout>
  );
}
