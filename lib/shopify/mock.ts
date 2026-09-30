import type { Product, Collection } from './types';

const MOCK_IMAGES = [
  '/lumina_headphones_1790748319098.png', 
  '/lumina_smartwatch_1790748351632.png',
  '/lumina_camera_1790748394804.png',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop', 
];

const MOCK_PRODUCTS_DATA = [
  { title: "Lumina H1 Pro ANC Headphones", desc: "Experience premium quality with our signature noise-cancelling headphones. Designed with precision and crafted for the modern audiophile.", price: 299 },
  { title: "Lumina Watch Series X", desc: "A sleek, minimalist smartwatch with a premium metal band. Track your health, stay connected, and look good doing it.", price: 349 },
  { title: "Lumina CaptureX Camera", desc: "Vintage-inspired modern digital camera with silver and black leather finish. Premium mirrorless technology for professional photography.", price: 1299 },
  { title: "Lumina SoundCore Speaker", desc: "Minimalist smart home speaker with premium acoustic design. Deep bass and crystal-clear highs for any room.", price: 199 },
  { title: "Lumina Pods True Wireless", desc: "True wireless earbuds in a sleek charging case. Matte white finish and premium sound quality.", price: 149 },
  { title: "Lumina MechX Keyboard", desc: "Premium mechanical keyboard with a low-profile aluminum chassis. Minimalist layout for ultimate productivity.", price: 179 }
];

export function getMockProducts(): Product[] {
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `mock-product-${i}`,
    handle: `lumina-product-${i}`,
    title: MOCK_PRODUCTS_DATA[i].title,
    description: MOCK_PRODUCTS_DATA[i].desc,
    descriptionHtml: `<p>${MOCK_PRODUCTS_DATA[i].desc}</p>`,
    availableForSale: true,
    categoryId: 'electronics',
    tags: ['premium', 'new', 'featured'],
    currencyCode: 'USD',
    priceRange: {
      minVariantPrice: { amount: `${MOCK_PRODUCTS_DATA[i].price}`, currencyCode: 'USD' },
      maxVariantPrice: { amount: `${MOCK_PRODUCTS_DATA[i].price}`, currencyCode: 'USD' },
    },
    featuredImage: {
      url: MOCK_IMAGES[i],
      altText: MOCK_PRODUCTS_DATA[i].title,
      width: 800,
      height: 800,
    },
    images: [
      {
        url: MOCK_IMAGES[i],
        altText: MOCK_PRODUCTS_DATA[i].title,
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
        price: { amount: `${MOCK_PRODUCTS_DATA[i].price}`, currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }]
      }
    ],
    seo: {
      title: MOCK_PRODUCTS_DATA[i].title,
      description: MOCK_PRODUCTS_DATA[i].desc
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
      parentCategoryTree: [],
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
      parentCategoryTree: [],
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
