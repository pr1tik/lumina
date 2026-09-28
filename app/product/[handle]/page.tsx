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
import { PageLayout } from '@/components/layout/page-layout';
import { ProductViewHero } from './components/product-view-hero';
import { Star, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/shopify/utils';

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
    title: `${product.title} (${product.modelNumber || 'Edition 2026'}) | Lumina Studio`,
    description: product.description,
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
  const allProducts = await getProducts({ limit: 12 });
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
                  Catalogue
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
              <BreadcrumbPage className="font-mono text-xs">{product.modelNumber || product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Master Interactive Product View */}
        <ProductViewHero product={product} />

        {/* Collector Reviews Section */}
        <section className="mt-20 pt-16 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                Verified Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Collector Reviews & Field Reports
              </h2>
            </div>

            <div className="flex items-center gap-4 bg-muted/60 px-4 py-2.5 rounded-2xl border border-border">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-mono">
                <span className="font-bold text-foreground">4.9</span>
                <span className="text-muted-foreground"> / 5.0 (38 Verified Collectors)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-muted/40 border border-border flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">{rev.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1">{rev.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-foreground">{rev.author}</p>
                      <p className="text-[11px] text-muted-foreground">{rev.location}</p>
                    </div>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        <CheckCircle2 className="size-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="p-6 rounded-2xl bg-muted/40 border border-border flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">September 2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1">Uncompromising precision and finish</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      “Every edge and mechanical interface shows obsessive attention to tolerances. It sits seamlessly in our gallery space and performs flawlessly.”
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-foreground">Søren Lindqvist</p>
                      <p className="text-[11px] text-muted-foreground">Architect, Copenhagen</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      <CheckCircle2 className="size-3" />
                      Verified Purchase
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/40 border border-border flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">August 2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1">Delivered in custom wooden crating</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      “The unboxing experience alone reflects the calibre of Lumina’s studio. The piece has weight, tactile feedback, and generational build quality.”
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-foreground">Hannah Van Der Bilt</p>
                      <p className="text-[11px] text-muted-foreground">Studio Director, Amsterdam</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      <CheckCircle2 className="size-3" />
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Complementary Curations Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Architectural Pairings
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                  Complementary Curations
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold">
                  All Pieces →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <div key={rel.id} className="group flex flex-col bg-muted/50 rounded-2xl overflow-hidden border border-border hover:border-foreground/30 transition-all shadow-sm">
                  <Link href={`/product/${rel.handle}`} className="relative aspect-square overflow-hidden bg-popover" prefetch>
                    <Image
                      src={rel.featuredImage.url}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {rel.modelNumber && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-background/85 backdrop-blur-md text-foreground border border-border/60">
                        {rel.modelNumber}
                      </span>
                    )}
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
                        {formatPrice(rel.priceRange.minVariantPrice.amount, rel.priceRange.minVariantPrice.currencyCode)}
                      </span>
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs px-2.5">
                        <Link href={`/product/${rel.handle}`}>Inspect</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </PageLayout>
  );
}
