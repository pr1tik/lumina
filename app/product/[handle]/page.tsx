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

  const hasVariants = product.variants.length > 1;
  const hasEvenOptions = product.options.length % 2 === 0;

  return (
    <PageLayout className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-sides py-6 md:py-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6 md:mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Mobile Gallery Slider */}
          <div className="lg:hidden col-span-full h-[55vh] min-h-[380px] rounded-2xl overflow-hidden border border-border bg-popover">
            <Suspense fallback={null}>
              <MobileGallerySlider product={product} />
            </Suspense>
          </div>

          {/* Left/Main Column: Desktop Gallery */}
          <div className="hidden lg:block lg:col-span-7 space-y-4">
            <Suspense fallback={null}>
              <div className="rounded-2xl overflow-hidden border border-border bg-popover space-y-4">
                <DesktopGallery product={product} />
              </div>
            </Suspense>
          </div>

          {/* Right Column: Sticky Product Purchase Box & Details */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            
            {/* Header Box */}
            <div className="p-6 rounded-2xl bg-muted/60 border border-border flex flex-col gap-4">
              
              {/* Rating & In-Stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-mono font-medium text-muted-foreground ml-1">
                    4.9 (38)
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  In Stock • Dispatch in 24h
                </span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                  {product.categoryId || 'Curated'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {product.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-3 border-t border-border/60">
                <span className="text-3xl font-bold font-mono text-foreground">
                  {formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base line-through text-muted-foreground font-mono">
                    {formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
                  </span>
                )}
              </div>

              {/* Variant Selector Slots */}
              <div className="space-y-3 pt-2">
                <Suspense fallback={<VariantSelectorSlots product={product} fallback />}>
                  <VariantSelectorSlots product={product} />
                </Suspense>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-2">
                <Suspense
                  fallback={
                    <AddToCartButton
                      className="w-full"
                      product={product}
                      size="lg"
                    />
                  }
                >
                  <AddToCart
                    product={product}
                    size="lg"
                    className="w-full h-13 text-base font-semibold"
                  />
                </Suspense>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/60 text-center">
                <div className="flex flex-col items-center justify-center p-1">
                  <Truck className="size-4 text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground leading-tight">Free Insured Courier</span>
                </div>
                <div className="flex flex-col items-center justify-center p-1 border-x border-border/60">
                  <RefreshCw className="size-4 text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground leading-tight">30-Day Studio Trial</span>
                </div>
                <div className="flex flex-col items-center justify-center p-1">
                  <ShieldCheck className="size-4 text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground leading-tight">2-Year Warranty</span>
                </div>
              </div>

            </div>

            {/* Product Prose Description */}
            <Prose
              className="p-6 rounded-2xl bg-muted/40 border border-border text-sm leading-relaxed text-muted-foreground"
              html={product.descriptionHtml}
            />

            {/* Specifications Accordion */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border">
              <Accordion type="single" collapsible defaultValue="specs" className="w-full">
                <AccordionItem value="specs">
                  <AccordionTrigger className="text-sm font-semibold">
                    Materials & Architecture
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                    <p>• Monolithic precision machining with aerospace-grade anodized finishes.</p>
                    <p>• Ethically sourced raw components calibrated for generational longevity.</p>
                    <p>• Individually hand-finished and serialized by master craftsmen.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-sm font-semibold">
                    Shipping & White-Glove Transit
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
                    <p>• Dispatches within 24 hours in bespoke impact-resistant packaging.</p>
                    <p>• Fully insured courier transit with continuous telemetry tracking.</p>
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

          </div>

        </div>

      </div>

      {/* Complementary Curations Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border mt-16 px-sides py-16 bg-muted/30">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <div key={rel.id} className="group flex flex-col bg-muted/60 rounded-2xl overflow-hidden border border-border hover:border-foreground/30 transition-all">
                  <Link href={`/product/${rel.handle}`} className="relative aspect-square overflow-hidden bg-popover" prefetch>
                    <Image
                      src={rel.featuredImage.url}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                        {rel.categoryId}
                      </span>
                      <Link href={`/product/${rel.handle}`} className="text-sm font-bold hover:underline line-clamp-1">
                        {rel.title}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-sm font-bold font-mono">
                        ${rel.priceRange.minVariantPrice.amount}
                      </span>
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs px-2.5">
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
