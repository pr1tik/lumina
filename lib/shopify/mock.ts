import type { Product, Collection } from './types';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', // Watch
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', // Headphones
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop', // Camera
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', // Shoes
  'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop', // Chair
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop', // Sunglasses
];

export function getMockProducts(): Product[] {
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `mock-product-${i}`,
    handle: `lumina-product-${i}`,
    title: `Lumina Signature Edition ${i + 1}`,
    description: 'Experience premium quality with our signature collection. Designed with precision and crafted for the modern aesthetic.',
    descriptionHtml: '<p>Experience premium quality with our signature collection. Designed with precision and crafted for the modern aesthetic.</p>',
    availableForSale: true,
    categoryId: 'electronics',
    tags: ['premium', 'new'],
    currencyCode: 'USD',
    priceRange: {
      minVariantPrice: { amount: `${99 + i * 50}`, currencyCode: 'USD' },
      maxVariantPrice: { amount: `${99 + i * 50}`, currencyCode: 'USD' },
    },
    featuredImage: {
      url: MOCK_IMAGES[i % MOCK_IMAGES.length],
      altText: `Lumina Product ${i + 1}`,
      width: 800,
      height: 800,
    },
    images: [
      {
        url: MOCK_IMAGES[i % MOCK_IMAGES.length],
        altText: `Lumina Product ${i + 1}`,
        width: 800,
        height: 800,
      }
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'white', name: 'White' }
        ]
      }
    ],
    variants: [
      {
        id: `mock-variant-${i}-1`,
        title: 'Black',
        availableForSale: true,
        price: { amount: `${99 + i * 50}`, currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }]
      }
    ],
    seo: {
      title: `Lumina Signature Edition ${i + 1}`,
      description: 'Premium quality product designed with precision.'
    },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }));
}

export function getMockCollections(): Collection[] {
  return [
    {
      id: 'frontpage',
      handle: 'frontpage',
      title: 'Featured Collection',
      description: 'Our handpicked selection of premium items.',
      seo: {
        title: 'Featured Collection',
        description: 'Our handpicked selection of premium items.',
      },
      updatedAt: new Date().toISOString(),
      path: '/shop/frontpage',
    },
    {
      id: 'new-arrivals',
      handle: 'new-arrivals',
      title: 'New Arrivals',
      description: 'The latest additions to the Lumina catalog.',
      seo: {
        title: 'New Arrivals',
        description: 'The latest additions to the Lumina catalog.',
      },
      updatedAt: new Date().toISOString(),
      path: '/shop/new-arrivals',
    },
  ];
}

export function getMockProduct(handle: string): Product | null {
  const products = getMockProducts();
  return products.find(p => p.handle === handle) || products[0];
}

export function getMockCollection(handle: string): Collection | null {
  const collections = getMockCollections();
  return collections.find(c => c.handle === handle) || collections[0];
}
