import { MetadataRoute } from 'next';
import { getProducts, getCollections } from '@/lib/shopify';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }
  ];

  try {
    const products = await getProducts({});
    const collections = await getCollections();

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${SITE_URL}/product/${product.handle}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
      url: `${SITE_URL}/shop/${collection.handle}`,
      lastModified: new Date(collection.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...sitemapRoutes, ...productRoutes, ...collectionRoutes];
  } catch (error) {
    // If shopify fetch fails, just return base routes
    return sitemapRoutes;
  }
}
