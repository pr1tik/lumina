import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCollection, getProduct, getProducts } from '@/lib/shopify';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SidebarLinks } from '@/components/layout/sidebar/product-sidebar-links';
import { AddToCart, AddToCartButton } from '@/components/cart/add-to-cart';
import { storeCatalog } from '@/lib/shopify/constants';
import Prose from '@/components/prose';
import { formatPrice } from '@/lib/shopify/utils';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { VariantSelectorSlots } from './components/variant-selector-slots';
import { MobileGallerySlider } from './components/mobile-gallery-slider';
import { DesktopGallery } from './components/desktop-gallery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ShieldCheck, Truck, RefreshCw, Star, Check } from 'lucide-react';

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const products = await getProducts({ limit: 100 });

    return products.map(product => ({
      handle: product.handle,
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    return [];
  }
}

// Enable ISR with 1 minute revalidation
export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: `${product.seo.title || product.title} | Lumina`,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const collection = product.categoryId ? await getCollection(product.categoryId) : null;
  const allProducts = await getProducts({ limit: 8 });
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: product.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  const [rootParentCategory] = collection?.parentCategoryTree?.filter(
    (c: any) => c.id !== storeCatalog.rootCategoryId
  ) ?? [undefined];

  const hasVariants = product.variants.length > 1;
  const hasEvenOptions = product.options.length % 2 === 0;

  return (
    <PageLayout className="bg-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-sides min-h-max">
        {/* Mobile Gallery Slider */}
        <div className="md:hidden col-span-full h-[60vh] min-h-[400px]">
          <Suspense fallback={null}>
            <MobileGallerySlider product={product} />
          </Suspense>
        </div>

        <div className="flex sticky top-0 flex-col col-span-5 2xl:col-span-4 max-md:col-span-full md:h-screen min-h-max max-md:p-sides md:pl-sides md:pt-top-spacing max-md:static overflow-y-auto scrollbar-hide pb-12">
          <div className="col-span-full">
            <Breadcrumb className="col-span-full mb-4 md:mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/shop" prefetch>
                      Shop
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {collection && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/shop/${collection.handle}`} prefetch>
                          {collection.title}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col col-span-full gap-4 md:mb-6 max-md:order-2">
              <div className="flex flex-col px-4 py-3 rounded-xl bg-popover gap-3">
                
                {/* Rating badge */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-medium text-muted-foreground">
                    4.9 / 5.0 (38 collector reviews)
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-bold lg:text-2xl 2xl:text-3xl text-balance">
                    {product.title}
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">{product.description}</p>
                </div>

                <div className="flex items-baseline gap-3 pt-1 border-t border-border/50">
                  <span className="text-2xl font-bold font-mono">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base line-through opacity-40 font-mono">
                      {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
                    </span>
                  )}
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    In Stock — Ready to Dispatch
                  </span>
                </div>
              </div>

              {/* Variant Selector and Add to Cart */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Suspense fallback={<VariantSelectorSlots product={product} fallback />}>
                  <VariantSelectorSlots product={product} />
                </Suspense>

                <Suspense
                  fallback={
                    <AddToCartButton
                      className={cn('w-full', {
                        'col-span-full': !hasVariants || hasEvenOptions,
                      })}
                      product={product}
                      size="lg"
                    />
                  }
                >
                  <AddToCart
                    product={product}
                    size="lg"
                    className={cn('w-full', {
                      'col-span-full': !hasVariants || hasEvenOptions,
                    })}
                  />
                </Suspense>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-popover/40 border border-border/60 text-center">
                <div className="flex flex-col items-center justify-center p-1">
                  <Truck className="size-4 text-muted-foreground mb-1" />
                  <span className="text-[11px] font-medium leading-tight">Free Insured Courier</span>
                </div>
                <div className="flex flex-col items-center justify-center p-1 border-x border-border/60">
                  <RefreshCw className="size-4 text-muted-foreground mb-1" />
                  <span className="text-[11px] font-medium leading-tight">30-Day Studio Trial</span>
                </div>
                <div className="flex flex-col items-center justify-center p-1">
                  <ShieldCheck className="size-4 text-muted-foreground mb-1" />
                  <span className="text-[11px] font-medium leading-tight">2-Year Warranty</span>
                </div>
              </div>

            </div>
          </div>

          <Prose
            className="col-span-full mb-4 opacity-90 max-md:order-3 max-md:my-4 text-sm"
            html={product.descriptionHtml}
          />

          {/* Interactive Specifications Accordion */}
          <div className="col-span-full my-4">
            <Accordion type="single" collapsible defaultValue="specs" className="w-full">
              <AccordionItem value="specs">
                <AccordionTrigger className="text-sm font-semibold">
                  Materials & Craftsmanship
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                  <p>• Monolithic precision machining with aerospace-grade anodized finishes.</p>
                  <p>• Ethically sourced raw components calibrated for generational longevity.</p>
                  <p>• Individually hand-finished and serialized by master craftsmen.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-semibold">
                  Shipping & Concierge Delivery
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                  <p>• Dispatches within 24 hours in bespoke impact-resistant packaging.</p>
                  <p>• Fully insured courier transit with continuous temperature & shock telemetry.</p>
                  <p>• Complimentary return shipping within 30 days of unboxing.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warranty">
                <AccordionTrigger className="text-sm font-semibold">
                  2-Year Studio Warranty
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                  <p>• Complete replacement coverage against structural, optical, or acoustic defects.</p>
                  <p>• Priority direct line to Lumina's engineering and design support studio.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <SidebarLinks className="flex-col-reverse max-md:hidden py-sides w-full max-w-[408px] pr-sides max-md:pr-0 max-md:py-0 mt-auto" />
        </div>

        {/* Desktop Gallery */}
        <div className="hidden overflow-y-auto relative col-span-7 col-start-6 w-full md:block">
          <Suspense fallback={null}>
            <DesktopGallery product={product} />
          </Suspense>
        </div>
      </div>

      {/* Complementary Curations Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border/80 px-sides py-12 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Coordinated Design
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                  Complementary Curations
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold">
                  View All Collection →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(rel => (
                <div key={rel.id} className="group flex flex-col bg-muted rounded-xl overflow-hidden border border-border/60 transition-all hover:border-foreground/30">
                  <Link href={`/product/${rel.handle}`} className="relative aspect-square overflow-hidden bg-popover" prefetch>
                    <Image
                      src={rel.featuredImage.url}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                        {rel.categoryId}
                      </span>
                      <Link href={`/product/${rel.handle}`} className="text-sm font-semibold hover:underline line-clamp-1">
                        {rel.title}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/40">
                      <span className="text-sm font-bold font-mono">
                        ${rel.priceRange.minVariantPrice.amount}
                      </span>
                      <Button asChild size="sm" variant="ghost" className="h-7 text-xs px-2">
                        <Link href={`/product/${rel.handle}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </PageLayout>
  );
}
