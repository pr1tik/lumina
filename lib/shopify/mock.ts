import type { Product, Collection, ProductSortKey, ProductCollectionSortKey } from './types';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'frontpage',
    handle: 'frontpage',
    title: 'Featured Curations',
    description: 'Iconic architectural lighting, acoustic audio, and minimalist essentials curated for elevated living.',
    seo: {
      title: 'Featured Curations | Lumina',
      description: 'Iconic architectural lighting, acoustic audio, and minimalist essentials.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/frontpage',
  },
  {
    id: 'lighting',
    handle: 'lighting',
    title: 'Lighting & Ambience',
    description: 'Sculptural pendant lights, circadian task beacons, and dimmable ambient fixtures.',
    seo: {
      title: 'Lighting & Ambience | Lumina',
      description: 'Sculptural pendant lights, circadian task beacons, and ambient fixtures.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/lighting',
  },
  {
    id: 'audio',
    handle: 'audio',
    title: 'Acoustics & Sound',
    description: 'Audiophile planar magnetic studio headphones and 360-degree wireless acoustic speakers.',
    seo: {
      title: 'Acoustics & Sound | Lumina',
      description: 'Audiophile planar magnetic studio headphones and acoustic sound systems.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/audio',
  },
  {
    id: 'timepieces',
    handle: 'timepieces',
    title: 'Time & Precision',
    description: 'Architectural desk clocks and precision automatic mechanical timepieces.',
    seo: {
      title: 'Time & Precision | Lumina',
      description: 'Architectural desk clocks and precision automatic mechanical timepieces.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/timepieces',
  },
  {
    id: 'furniture',
    handle: 'furniture',
    title: 'Living & Workspace',
    description: 'Ergonomic wool lounge chairs, solid honed marble trays, and ceramic stoneware vessels.',
    seo: {
      title: 'Living & Workspace | Lumina',
      description: 'Ergonomic lounge furniture, honed marble objects, and tactile ceramic vessels.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/furniture',
  },
  {
    id: 'accessories',
    handle: 'accessories',
    title: 'Carry & Tech',
    description: 'Full-grain Tuscan leather folios, ballistic nylon backpacks, and desk companions.',
    seo: {
      title: 'Carry & Tech | Lumina',
      description: 'Full-grain leather folios, modular backpacks, and desk essentials.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/accessories',
  },
  {
    id: 'new-arrivals',
    handle: 'new-arrivals',
    title: 'New Arrivals',
    description: 'The latest drops from our design studio in New York and Stockholm.',
    seo: {
      title: 'New Arrivals | Lumina',
      description: 'The latest drops from our design studio.',
    },
    parentCategoryTree: [{ id: 'joyco-root', name: 'All Products' }],
    updatedAt: new Date().toISOString(),
    path: '/shop/new-arrivals',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_aura_lamp',
    handle: 'lumina-aura-pendant',
    title: 'Aura Dimmable Pendant Lamp',
    modelNumber: 'LUM-01',
    edition: 'Series 2026 • Batch 04 of 500',
    categoryId: 'lighting',
    description: 'Sculptural spun aluminum pendant casting a continuous warm ambient glow with integrated capacitive touch dimming.',
    descriptionHtml: `
      <div>
        <p>The <strong>Lumina Aura Pendant</strong> redefines residential and studio lighting through monolithic simplicity. Spun from a continuous disc of aviation-grade aluminum, the convex parabolic reflector delivers uniform, glare-free downward illumination while casting a soft ambient halo against the ceiling.</p>
        <p>Featuring our custom 2700K Warm White CRI 98+ LED engine, it produces an organic, non-flickering spectrum designed to mimic the natural warm hues of twilight.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 6,
    priceRange: {
      minVariantPrice: { amount: '340', currencyCode: 'USD' },
      maxVariantPrice: { amount: '380', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '420', currencyCode: 'USD' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
      altText: 'Aura Dimmable Pendant Lamp in Obsidian Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
        altText: 'Aura Dimmable Pendant Lamp in Obsidian Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
        altText: 'Aura Dimmable Pendant Lamp in Raw Silver',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Aura Dimmable Pendant Lamp in Champagne Gold',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Gold' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'silver', name: 'Silver' },
          { id: 'gold', name: 'Gold' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_aura_black',
        title: 'Obsidian Black',
        availableForSale: true,
        price: { amount: '340', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_aura_silver',
        title: 'Raw Silver',
        availableForSale: true,
        price: { amount: '340', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        id: 'var_aura_gold',
        title: 'Champagne Gold',
        availableForSale: true,
        price: { amount: '380', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Gold' }],
      },
    ],
    specs: [
      { label: 'Light Source', value: 'Custom 2700K Warm White CRI 98+ LED Engine' },
      { label: 'Output', value: '2,100 Lumens (continuous 1%–100% dimming)' },
      { label: 'Dimensions', value: '420mm Ø × 140mm H; 2.5m Braided Cable' },
      { label: 'Weight', value: '2.4 kg (5.3 lbs)' },
      { label: 'Materials', value: 'Aviation-Grade Spun Aluminum, Frosted Borosilicate Diffuser' },
      { label: 'Input Voltage', value: '110V – 240V AC Universal (0–10V / TRIAC compatible)' },
    ],
    inTheBox: [
      '1× Lumina Aura Pendant Luminaire',
      '1× Braided Silicone Power Cable (2.5m)',
      '1× Solid Aluminum Ceiling Canopy with Quick-Mount Bracket',
      '1× Certificate of Authenticity with Individual Serial Number',
      '1× Installation Guide & Studio Microfiber Cloth',
    ],
    designerNote: '“We wanted to strip away decorative noise and let pure parabolic geometry do the work. The shadow line it creates against the ceiling is just as vital as the light thrown below.” — Studio Lumina, Stockholm',
    reviews: [
      {
        author: 'Marcus Sterling',
        location: 'Zurich, Switzerland',
        rating: 5,
        date: 'September 14, 2026',
        title: 'Museum-grade craftsmanship',
        comment: 'The spun aluminum edge is razor-sharp in its precision. Installed two over our dining table and the dimming transition is completely stepless and silent.',
        verified: true,
      },
      {
        author: 'Claire Beaumont',
        location: 'Paris, France',
        rating: 5,
        date: 'August 28, 2026',
        title: 'Exceptional light quality',
        comment: 'CRI 98 makes food, wood, and skin tones look wonderfully natural. No harsh shadows anywhere.',
        verified: true,
      },
    ],
    tags: ['lighting', 'bestseller', 'featured', 'new'],
    seo: {
      title: 'Aura Dimmable Pendant Lamp | Lumina',
      description: 'Sculptural spun aluminum pendant casting a continuous warm ambient glow.',
    },
  },
  {
    id: 'prod_soundsphere',
    handle: 'lumina-soundsphere-speaker',
    title: 'SoundSphere 360 Acoustic Speaker',
    modelNumber: 'LUM-02',
    edition: 'Series 2026 • Studio Reference',
    categoryId: 'audio',
    description: 'Precision omnidirectional acoustic architecture engineered with dual neodymium drivers and resonant chamber.',
    descriptionHtml: `
      <div>
        <p>The <strong>SoundSphere 360</strong> unites acoustic transparency with tactile sculptural form. Constructed with CNC-machined acoustic mesh and a solid vibration-damping polymer base, it creates a room-filling soundstage regardless of placement.</p>
        <p>Powered by our discrete Class-D amplifier architecture and custom DSP, SoundSphere renders voices with breathtaking intimacy and deep, authoritative transient bass.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 4,
    priceRange: {
      minVariantPrice: { amount: '480', currencyCode: 'USD' },
      maxVariantPrice: { amount: '480', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '550', currencyCode: 'USD' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
      altText: 'SoundSphere 360 Speaker in Obsidian Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
        altText: 'SoundSphere 360 Speaker in Obsidian Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
        altText: 'SoundSphere 360 Speaker in Polar White',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'White' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop',
        altText: 'SoundSphere 360 Speaker in Natural Stone',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'white', name: 'White' },
          { id: 'stone', name: 'Stone' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_sound_black',
        title: 'Obsidian Black',
        availableForSale: true,
        price: { amount: '480', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_sound_white',
        title: 'Polar White',
        availableForSale: true,
        price: { amount: '480', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'White' }],
      },
      {
        id: 'var_sound_stone',
        title: 'Natural Stone',
        availableForSale: true,
        price: { amount: '480', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
    ],
    specs: [
      { label: 'Acoustic Architecture', value: 'Twin 2.5" Neodymium Drivers + 4" Down-Firing Passive Radiator' },
      { label: 'Frequency Response', value: '38Hz – 24,000Hz (±2dB)' },
      { label: 'Amplification', value: 'Dual 35W RMS Class-D Discrete Amplifiers (70W Peak)' },
      { label: 'Connectivity', value: 'Wi-Fi 6 (AirPlay 2, Spotify Connect), Bluetooth 5.3 aptX HD, USB-C DAC' },
      { label: 'Battery Life', value: '22 Hours continuous playback (Li-Ion 5400mAh)' },
      { label: 'Dimensions & Weight', value: '180mm Ø × 220mm H; 2.85 kg' },
    ],
    inTheBox: [
      '1× Lumina SoundSphere 360 Acoustic Speaker',
      '1× Braided USB-C to USB-C Fast Charging Cable (1.8m)',
      '1× 45W GaN Studio Power Adapter',
      '1× Magnetic Acoustic Base Ring',
      '1× Reference Manual & Registration Card',
    ],
    designerNote: '“Sound shouldn’t require you to sit in a narrow sweet-spot. SoundSphere behaves like an acoustic instrument — sending coherent spherical waves that fill the physical volume naturally.” — Acoustic Engineering Lab, Copenhagen',
    reviews: [
      {
        author: 'Dr. Elena Kurosawa',
        location: 'Tokyo, Japan',
        rating: 5,
        date: 'September 19, 2026',
        title: 'Sublime acoustic balance',
        comment: 'Remarkable stereo imaging for a single enclosure. Acoustic bass is tight, not boomy, and vocals sit right in the room with you.',
        verified: true,
      },
    ],
    tags: ['audio', 'hi-fi', 'bestseller', 'featured'],
    seo: {
      title: 'SoundSphere 360 Acoustic Speaker | Lumina',
      description: 'Precision omnidirectional acoustic architecture engineered with dual neodymium drivers.',
    },
  },
  {
    id: 'prod_chrono_watch',
    handle: 'lumina-chrono-automatic-watch',
    title: 'Chrono Minimalist Automatic Watch',
    modelNumber: 'LUM-03',
    edition: 'Numbered Edition • 300 Pieces',
    categoryId: 'timepieces',
    description: 'Surgical-grade 316L stainless steel timepiece with Japanese mechanical movement and vegetable-tanned strap.',
    descriptionHtml: `
      <div>
        <p>A masterclass in restraint, the <strong>Lumina Chrono</strong> is engineered for decades of service. Underneath its anti-reflective sapphire crystal sits a clean, unadorned sub-second register powered by a 24-jewel automatic mechanical movement with 42-hour power reserve.</p>
        <p>Hand-assembled in Glashütte with certified 5 ATM water resistance and interchangeable Italian full-grain straps.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 8,
    priceRange: {
      minVariantPrice: { amount: '520', currencyCode: 'USD' },
      maxVariantPrice: { amount: '560', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      altText: 'Chrono Minimalist Watch in Obsidian Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
        altText: 'Chrono Minimalist Watch in Obsidian Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
        altText: 'Chrono Minimalist Watch in Classic Silver',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop',
        altText: 'Chrono Minimalist Watch in Champagne Gold',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Gold' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'silver', name: 'Silver' },
          { id: 'gold', name: 'Gold' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_chrono_black',
        title: 'Obsidian Black',
        availableForSale: true,
        price: { amount: '520', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_chrono_silver',
        title: 'Classic Silver',
        availableForSale: true,
        price: { amount: '520', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        id: 'var_chrono_gold',
        title: 'Champagne Gold',
        availableForSale: true,
        price: { amount: '560', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Gold' }],
      },
    ],
    specs: [
      { label: 'Case Diameter', value: '39mm (9.4mm slim profile)' },
      { label: 'Movement', value: 'Japanese Caliber 9015 Automatic (28,800 bph, 42h reserve)' },
      { label: 'Crystal', value: 'Double-Domed Sapphire with 5× Anti-Reflective Inner Coating' },
      { label: 'Water Resistance', value: '5 ATM (50 meters / 165 feet)' },
      { label: 'Case Material', value: 'Surgical-Grade 316L Stainless Steel' },
      { label: 'Strap', value: '20mm Vegetable-Tanned Tuscan Leather with Quick-Release' },
    ],
    inTheBox: [
      '1× Lumina Chrono Minimalist Automatic Watch',
      '1× Tuscan Leather Strap (Installed)',
      '1× Handcrafted Solid Walnut Storage Case',
      '1× Chronometer Certificate with Serial Stamp',
      '1× 5-Year Global International Movement Warranty Card',
    ],
    designerNote: '“We eliminated all gratuitous branding from the dial. When you look at your wrist, you should perceive the flow of time, not an advertisement.” — Horology Atelier, Geneva',
    reviews: [
      {
        author: 'Julian Hayes',
        location: 'London, UK',
        rating: 5,
        date: 'August 12, 2026',
        title: 'Perfect everyday mechanical piece',
        comment: 'Runs within +3 seconds a day. The sub-dial tick has absolute mechanical poetry. Case finishing punches well above watches three times its price.',
        verified: true,
      },
    ],
    tags: ['timepieces', 'luxury', 'precision', 'featured'],
    seo: {
      title: 'Chrono Minimalist Automatic Watch | Lumina',
      description: 'Surgical-grade 316L stainless steel timepiece with mechanical automatic movement.',
    },
  },
  {
    id: 'prod_ridge_chair',
    handle: 'lumina-ridge-lounge-chair',
    title: 'Ridge Ergonomic Lounge Armchair',
    modelNumber: 'LUM-04',
    edition: 'Craft Batch • Made to Order',
    categoryId: 'furniture',
    description: 'Anatomically sculpted cold-cured foam wrapped in tactile melange wool with seamless matte steel sled base.',
    descriptionHtml: `
      <div>
        <p>The <strong>Ridge Lounge Armchair</strong> offers exceptional ergonomic support with a dramatic architectural silhouette. Designed to cradle the body through subtle pressure-distributing compound curves, it anchors any modern living or gallery space.</p>
        <p>Upholstered in 100,000-rub heavy wool melange, with a hidden continuous steel skeleton that ensures zero structural sagging over decades of daily use.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 3,
    priceRange: {
      minVariantPrice: { amount: '890', currencyCode: 'USD' },
      maxVariantPrice: { amount: '890', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '1100', currencyCode: 'USD' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1580481077195-c2662095b34a?q=80&w=1200&auto=format&fit=crop',
      altText: 'Ridge Lounge Chair in Stone Grey',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580481077195-c2662095b34a?q=80&w=1200&auto=format&fit=crop',
        altText: 'Ridge Lounge Chair in Stone Grey',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
        altText: 'Ridge Lounge Chair in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
        altText: 'Ridge Lounge Chair in Olive Moss',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'stone', name: 'Stone' },
          { id: 'black', name: 'Black' },
          { id: 'olive', name: 'Olive' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_chair_stone',
        title: 'Stone Grey',
        availableForSale: true,
        price: { amount: '890', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
      {
        id: 'var_chair_black',
        title: 'Matte Black',
        availableForSale: true,
        price: { amount: '890', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_chair_olive',
        title: 'Olive Moss',
        availableForSale: true,
        price: { amount: '890', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
    ],
    specs: [
      { label: 'Dimensions', value: '820mm W × 780mm D × 740mm H (Seat H: 410mm)' },
      { label: 'Weight', value: '18.4 kg (40.5 lbs)' },
      { label: 'Upholstery', value: '90% New Zealand Wool, 10% Polyamide (100,000 Martindale)' },
      { label: 'Internal Structure', value: 'Cold-Cured High-Density Polyurethane over Welded Steel Frame' },
      { label: 'Base', value: '18mm Solid Sled Steel with Matte Powder Coating & Felt Glides' },
    ],
    inTheBox: [
      '1× Lumina Ridge Lounge Armchair (Fully Assembled)',
      '1× Set of Hard-Floor Protective Felt Glides',
      '1× Wool Upholstery Care & Maintenance Kit',
      '1× Studio Certificate of Authenticity',
    ],
    tags: ['furniture', 'lounge', 'design', 'featured'],
    seo: {
      title: 'Ridge Ergonomic Lounge Armchair | Lumina',
      description: 'Anatomically sculpted cold-cured foam wrapped in tactile melange wool.',
    },
  },
  {
    id: 'prod_ortho_headphones',
    handle: 'lumina-ortho-studio-headphones',
    title: 'Ortho Planar Magnetic Headphones',
    modelNumber: 'LUM-05',
    edition: 'Reference Series',
    categoryId: 'audio',
    description: 'Audiophile open-back planar magnetic transducers delivering razor-sharp transient response and expansive spatial depth.',
    descriptionHtml: `
      <div>
        <p>Engineered for critical listening and studio mastering, the <strong>Ortho Planar Headphones</strong> incorporate ultra-thin nanometer-grade diaphragms suspended between dual symmetric neodymium magnetic arrays. Experience distortion-free sub-bass and crystalline high-frequency extension.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 7,
    priceRange: {
      minVariantPrice: { amount: '390', currencyCode: 'USD' },
      maxVariantPrice: { amount: '390', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      altText: 'Ortho Planar Headphones in Matte Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
        altText: 'Ortho Planar Headphones in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop',
        altText: 'Ortho Planar Headphones in Brushed Silver',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
        altText: 'Ortho Planar Headphones in Midnight Navy',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Navy' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'silver', name: 'Silver' },
          { id: 'navy', name: 'Navy' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_ortho_black',
        title: 'Matte Black',
        availableForSale: true,
        price: { amount: '390', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_ortho_silver',
        title: 'Brushed Silver',
        availableForSale: true,
        price: { amount: '390', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        id: 'var_ortho_navy',
        title: 'Midnight Navy',
        availableForSale: true,
        price: { amount: '390', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Navy' }],
      },
    ],
    specs: [
      { label: 'Transducer Type', value: '88mm Open-Back Planar Magnetic' },
      { label: 'Frequency Response', value: '8Hz – 52,000Hz (±1.5dB)' },
      { label: 'Total Harmonic Distortion', value: '< 0.05% @ 1kHz, 100dB SPL' },
      { label: 'Impedance', value: '32 Ohms (Easily driven by portable DACs)' },
      { label: 'Weight', value: '385g (Without cable)' },
      { label: 'Cushions', value: 'Perforated Italian Lambskin Memory Foam (Replaceable)' },
    ],
    inTheBox: [
      '1× Lumina Ortho Planar Magnetic Headphones',
      '1× Braided 3.5mm Silver-Plated OFC Cable (1.5m)',
      '1× Balanced 4.4mm Pentaconn Audiophile Cable (2.0m)',
      '1× Gold-Plated 6.35mm Screw-On Studio Adapter',
      '1× Magnetic Hard-Shell Aluminum Travel Case',
    ],
    tags: ['audio', 'studio', 'featured', 'bestseller'],
    seo: {
      title: 'Ortho Planar Magnetic Headphones | Lumina',
      description: 'Audiophile open-back planar magnetic transducers for studio fidelity.',
    },
  },
  {
    id: 'prod_monolith_tray',
    handle: 'lumina-monolith-marble-tray',
    title: 'Monolith Honed Marble Valet Tray',
    modelNumber: 'LUM-06',
    edition: 'Natural Stone Series',
    categoryId: 'furniture',
    description: 'Milled from a solid monolith of natural marble with hand-beveled edges and protective silicone underside.',
    descriptionHtml: `
      <div>
        <p>Substantial and tactile, the <strong>Monolith Tray</strong> brings geological presence to desks, vanities, or coffee tables. Each piece is carved from a single slab of natural marble and hand-honed to a low-sheen satin finish.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 11,
    priceRange: {
      minVariantPrice: { amount: '160', currencyCode: 'USD' },
      maxVariantPrice: { amount: '160', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      altText: 'Monolith Marble Tray in Nero Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
        altText: 'Monolith Marble Tray in Nero Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        altText: 'Monolith Marble Tray in Carrara White',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'White' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
        altText: 'Monolith Marble Tray in Verde Green',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Green' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'white', name: 'White' },
          { id: 'green', name: 'Green' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_tray_black',
        title: 'Nero Marquina Black',
        availableForSale: true,
        price: { amount: '160', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_tray_white',
        title: 'Carrara White',
        availableForSale: true,
        price: { amount: '160', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'White' }],
      },
      {
        id: 'var_tray_green',
        title: 'Guatemala Green',
        availableForSale: true,
        price: { amount: '160', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Green' }],
      },
    ],
    specs: [
      { label: 'Material', value: '100% Solid Natural Quarried Marble' },
      { label: 'Dimensions', value: '300mm L × 180mm W × 28mm Thickness' },
      { label: 'Weight', value: '1.95 kg solid mass' },
      { label: 'Finish', value: 'Honed Matte Finish with Food-Safe Stone Sealant' },
    ],
    inTheBox: [
      '1× Lumina Monolith Solid Marble Valet Tray',
      '1× Recessed Natural Wool Underside Protector Pad',
      '1× Stone Conservation & Care Guide',
    ],
    tags: ['furniture', 'objects', 'marble', 'new'],
    seo: {
      title: 'Monolith Honed Marble Valet Tray | Lumina',
      description: 'Milled from a solid monolith of natural marble with hand-beveled edges.',
    },
  },
  {
    id: 'prod_eclipse_beacon',
    handle: 'lumina-eclipse-desk-beacon',
    title: 'Eclipse Precision Desk Beacon',
    modelNumber: 'LUM-07',
    edition: 'Circadian Workspace Edition',
    categoryId: 'lighting',
    description: 'Cantilevered architectural desk lamp with magnetic ball-joint pivot and circadian spectrum adjustment.',
    descriptionHtml: `
      <div>
        <p>The <strong>Eclipse Desk Beacon</strong> combines micro-mechanical precision with intelligent illumination. Its counter-balanced arm glides smoothly on sealed bearings, staying locked in position while the magnetic luminaire rotates 360 degrees for direct task focus or indirect wall washing.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 5,
    priceRange: {
      minVariantPrice: { amount: '280', currencyCode: 'USD' },
      maxVariantPrice: { amount: '280', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
      altText: 'Eclipse Desk Beacon in Matte Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
        altText: 'Eclipse Desk Beacon in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
        altText: 'Eclipse Desk Beacon in Desert Sand',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Sand' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Eclipse Desk Beacon in Forest Olive',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'sand', name: 'Sand' },
          { id: 'olive', name: 'Olive' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_eclipse_black',
        title: 'Matte Black',
        availableForSale: true,
        price: { amount: '280', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_eclipse_sand',
        title: 'Desert Sand',
        availableForSale: true,
        price: { amount: '280', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Sand' }],
      },
      {
        id: 'var_eclipse_olive',
        title: 'Forest Olive',
        availableForSale: true,
        price: { amount: '280', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
    ],
    specs: [
      { label: 'Color Temperature', value: '1,800K (Candlelight) – 4,500K (Daylight)' },
      { label: 'Illuminance', value: 'Up to 1,200 Lux @ 45cm (Zero Glare Asymmetric TIR)' },
      { label: 'Articulations', value: 'Dual Counter-Weighted Ball Bearings + 360° Magnetic Head' },
      { label: 'Base Features', value: 'Solid Cast Iron Counter-Weight with 15W Qi2 Wireless Charging' },
    ],
    inTheBox: [
      '1× Lumina Eclipse Precision Desk Beacon',
      '1× Weighted Base with Integrated Qi2 Fast Charger',
      '1× Braided 65W USB-C Power Adapter',
      '1× Calibration & Warranty Document',
    ],
    tags: ['lighting', 'workspace', 'bestseller', 'featured'],
    seo: {
      title: 'Eclipse Precision Desk Beacon | Lumina',
      description: 'Cantilevered architectural desk lamp with magnetic ball-joint pivot.',
    },
  },
  {
    id: 'prod_leather_folio',
    handle: 'lumina-strata-leather-folio',
    title: 'Strata Top-Grain Leather Tech Folio',
    modelNumber: 'LUM-08',
    edition: 'Tuscan Leather Series',
    categoryId: 'accessories',
    description: 'Vegetable-tanned Tuscan leather folio featuring magnetic gusset, microfiber interior, and cable routing.',
    descriptionHtml: `
      <div>
        <p>Designed for mobile professionals and creative directors, the <strong>Strata Leather Folio</strong> houses up to a 14" MacBook or 13" iPad Pro alongside notebooks, charging cables, stylus, and cards in an ultra-slim 18mm silhouette.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 9,
    priceRange: {
      minVariantPrice: { amount: '195', currencyCode: 'USD' },
      maxVariantPrice: { amount: '195', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
      altText: 'Strata Leather Folio in Deep Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
        altText: 'Strata Leather Folio in Deep Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
        altText: 'Strata Leather Folio in Chestnut Brown',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Brown' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
        altText: 'Strata Leather Folio in Saddle Tan',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Tan' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'brown', name: 'Brown' },
          { id: 'tan', name: 'Tan' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_folio_black',
        title: 'Deep Black',
        availableForSale: true,
        price: { amount: '195', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_folio_brown',
        title: 'Chestnut Brown',
        availableForSale: true,
        price: { amount: '195', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Brown' }],
      },
      {
        id: 'var_folio_tan',
        title: 'Saddle Tan',
        availableForSale: true,
        price: { amount: '195', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Tan' }],
      },
    ],
    specs: [
      { label: 'Leather Origin', value: 'Certified Full-Grain Tuscan Vegetable-Tanned Cowhide' },
      { label: 'Lining', value: 'Ultrasuede Scratch-Free Microfiber' },
      { label: 'Hardware', value: 'Concealed German Neodymium Magnetic Clasps' },
      { label: 'Dimensions', value: '340mm W × 245mm H × 20mm D (Fits up to 14" Laptops)' },
    ],
    inTheBox: [
      '1× Lumina Strata Leather Tech Folio',
      '1× Breathable Cotton Dust Bag',
      '1× Natural Beeswax Conditioning Balm',
    ],
    tags: ['accessories', 'carry', 'leather', 'featured'],
    seo: {
      title: 'Strata Top-Grain Leather Tech Folio | Lumina',
      description: 'Vegetable-tanned Tuscan leather folio featuring magnetic gusset and microfiber lining.',
    },
  },
  {
    id: 'prod_solstice_clock',
    handle: 'lumina-solstice-table-clock',
    title: 'Solstice Concrete & Brass Table Clock',
    modelNumber: 'LUM-09',
    edition: 'Edition of 400',
    categoryId: 'timepieces',
    description: 'Cast architectural concrete dial accented with brushed solid brass hands and whisper-silent sweep movement.',
    descriptionHtml: `
      <div>
        <p>The <strong>Solstice Table Clock</strong> explores the intersection of raw geological material and horological refinement. Individually cast in high-density aggregate concrete with micro-chamfered hourly indices and solid satin brass needles.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 6,
    priceRange: {
      minVariantPrice: { amount: '210', currencyCode: 'USD' },
      maxVariantPrice: { amount: '210', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1200&auto=format&fit=crop',
      altText: 'Solstice Concrete Clock in Stone Grey',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1200&auto=format&fit=crop',
        altText: 'Solstice Concrete Clock in Stone Grey',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Solstice Concrete Clock in Carbon Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Solstice Concrete Clock in Raw Terracotta',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Terracotta' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'stone', name: 'Stone' },
          { id: 'black', name: 'Black' },
          { id: 'terracotta', name: 'Terracotta' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_clock_stone',
        title: 'Stone Grey',
        availableForSale: true,
        price: { amount: '210', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
      {
        id: 'var_clock_black',
        title: 'Carbon Black',
        availableForSale: true,
        price: { amount: '210', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_clock_terra',
        title: 'Raw Terracotta',
        availableForSale: true,
        price: { amount: '210', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Terracotta' }],
      },
    ],
    specs: [
      { label: 'Movement', value: 'High-Torque Continuous Sweep Quartz (Audibly Silent)' },
      { label: 'Body', value: 'Ultra-Dense Architectural Micro-Concrete Casting' },
      { label: 'Hands', value: 'Brushed Solid Brass with Protective Matte Lacquer' },
      { label: 'Battery', value: '1× AA Lithium Battery (Included, 2-Year Lifespan)' },
      { label: 'Dimensions', value: '160mm Ø × 65mm D; 1.4 kg' },
    ],
    inTheBox: [
      '1× Lumina Solstice Concrete Table Clock',
      '1× Long-Life Energizer Ultimate Lithium AA Battery',
      '1× Microfiber Polishing Cloth & Authentication Certificate',
    ],
    tags: ['timepieces', 'desk', 'minimalism', 'new'],
    seo: {
      title: 'Solstice Concrete Table Clock | Lumina',
      description: 'Cast architectural concrete dial accented with brushed solid brass hands.',
    },
  },
  {
    id: 'prod_arc_beacon',
    handle: 'lumina-arc-floor-pillar',
    title: 'Arc Architectural Floor Pillar',
    modelNumber: 'LUM-10',
    edition: 'Smart Monolith Series',
    categoryId: 'lighting',
    description: 'Slender vertical floor monolith delivering 3200-lumen indirect architectural wash with Zigbee & Matter connectivity.',
    descriptionHtml: `
      <div>
        <p>Transforming vertical volume with soft architectural washes, the <strong>Arc Floor Pillar</strong> is extruded from a single billet of aluminum. Its hidden 90-degree LED channel projects diffuse light against opposing walls, eliminating glare while visually expanding interior space.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 3,
    priceRange: {
      minVariantPrice: { amount: '650', currencyCode: 'USD' },
      maxVariantPrice: { amount: '650', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '780', currencyCode: 'USD' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
      altText: 'Arc Floor Pillar in Matte Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Arc Floor Pillar in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
        altText: 'Arc Floor Pillar in Anodized Silver',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'silver', name: 'Silver' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_arc_black',
        title: 'Matte Black',
        availableForSale: true,
        price: { amount: '650', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_arc_silver',
        title: 'Anodized Silver',
        availableForSale: true,
        price: { amount: '650', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
    ],
    specs: [
      { label: 'Illumination', value: '3,200 Lumens Indirect Architectural Wash' },
      { label: 'Color Tuning', value: '2,200K (Warm Ember) to 3,500K (Neutral Pure)' },
      { label: 'Smart Control', value: 'Matter, Apple HomeKit, Google Home, Zigbee 3.0 Native' },
      { label: 'Dimensions & Base', value: '1780mm H × 110mm Base Ø; 7.2 kg Cast Iron Stabilizer' },
    ],
    inTheBox: [
      '1× Lumina Arc Architectural Floor Monolith',
      '1× Heavy Cast Iron Base Plate with Locking Bolt',
      '1× Discreet Inline Foot Switch & Braided Cord (3m)',
      '1× Matter Setup QR Code & Studio Quickstart Card',
    ],
    tags: ['lighting', 'architectural', 'smart', 'bestseller'],
    seo: {
      title: 'Arc Architectural Floor Pillar | Lumina',
      description: 'Slender vertical floor monolith delivering indirect architectural wash.',
    },
  },
  {
    id: 'prod_axis_backpack',
    handle: 'lumina-axis-modular-backpack',
    title: 'Axis Weatherproof Modular Backpack',
    modelNumber: 'LUM-11',
    edition: 'Urban Commute Series',
    categoryId: 'accessories',
    description: 'Recycled 840D ballistic nylon pack equipped with Fidlock magnetic hardware, YKK Aquaguard zippers, and padded laptop vault.',
    descriptionHtml: `
      <div>
        <p>The <strong>Axis Modular Backpack</strong> adapts seamlessly between weekday commutes and international travel. Engineered with waterproof welded seams, ergonomic air-mesh shoulder harness, and an integrated luggage pass-through.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 10,
    priceRange: {
      minVariantPrice: { amount: '265', currencyCode: 'USD' },
      maxVariantPrice: { amount: '265', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      altText: 'Axis Backpack in Matte Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
        altText: 'Axis Backpack in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
        altText: 'Axis Backpack in Tactical Olive',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
        altText: 'Axis Backpack in Deep Navy',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Navy' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'black', name: 'Black' },
          { id: 'olive', name: 'Olive' },
          { id: 'navy', name: 'Navy' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_axis_black',
        title: 'Matte Black',
        availableForSale: true,
        price: { amount: '265', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_axis_olive',
        title: 'Tactical Olive',
        availableForSale: true,
        price: { amount: '265', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
      {
        id: 'var_axis_navy',
        title: 'Deep Navy',
        availableForSale: true,
        price: { amount: '265', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Navy' }],
      },
    ],
    specs: [
      { label: 'Shell Material', value: '840D Recycled Ballistic Cordura Nylon with PU Waterproof Coating' },
      { label: 'Hardware', value: 'German Fidlock V-Buckles & YKK Aquaguard Zippers' },
      { label: 'Capacity', value: '22 Liters (Compressible roll-top expandable to 26L)' },
      { label: 'Laptop Sleeve', value: 'Suspended False-Bottom Sleeve (Fits up to 16" MacBook Pro)' },
      { label: 'Weight', value: '1.18 kg' },
    ],
    inTheBox: [
      '1× Lumina Axis Modular Weatherproof Backpack',
      '1× Detachable Sternum Magnetic Strap',
      '1× Waterproof Transit Rainproof Cover',
    ],
    tags: ['accessories', 'travel', 'bestseller', 'new'],
    seo: {
      title: 'Axis Weatherproof Modular Backpack | Lumina',
      description: 'Recycled 840D ballistic nylon pack equipped with magnetic hardware.',
    },
  },
  {
    id: 'prod_terra_vase',
    handle: 'lumina-terra-stoneware-vessel',
    title: 'Terra Fluted Stoneware Vessel',
    modelNumber: 'LUM-12',
    edition: 'Studio Ceramics • Alentejo Portugal',
    categoryId: 'furniture',
    description: 'Wheel-thrown stoneware ceramic with rhythmic vertical fluting and reactive matte chalk glaze.',
    descriptionHtml: `
      <div>
        <p>Crafted in limited studio batches in Portugal, the <strong>Terra Fluted Vessel</strong> serves as a focal sculptural centerpiece. Hand-thrown using iron-rich stoneware clay and dipped in a custom unglazed matte slip.</p>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    stockCount: 14,
    priceRange: {
      minVariantPrice: { amount: '145', currencyCode: 'USD' },
      maxVariantPrice: { amount: '145', currencyCode: 'USD' },
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1200&auto=format&fit=crop',
      altText: 'Terra Stoneware Vessel in Dune Sand',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Terra Stoneware Vessel in Dune Sand',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Sand' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop',
        altText: 'Terra Stoneware Vessel in Baked Terracotta',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Terracotta' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop',
        altText: 'Terra Stoneware Vessel in Raw Stone',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
    ],
    options: [
      {
        id: 'color',
        name: 'Color',
        values: [
          { id: 'sand', name: 'Sand' },
          { id: 'terracotta', name: 'Terracotta' },
          { id: 'stone', name: 'Stone' },
        ],
      },
    ],
    variants: [
      {
        id: 'var_vase_sand',
        title: 'Dune Sand',
        availableForSale: true,
        price: { amount: '145', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Sand' }],
      },
      {
        id: 'var_vase_terra',
        title: 'Baked Terracotta',
        availableForSale: true,
        price: { amount: '145', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Terracotta' }],
      },
      {
        id: 'var_vase_stone',
        title: 'Raw Stone',
        availableForSale: true,
        price: { amount: '145', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
    ],
    specs: [
      { label: 'Craft Technique', value: 'Wheel-Thrown Stoneware with Hand-Carved Fluting' },
      { label: 'Origin', value: 'Individually Fired in Alentejo, Portugal' },
      { label: 'Dimensions', value: '280mm H × 170mm Maximum Ø' },
      { label: 'Glaze & Water', value: 'Glazed Watertight Interior / Raw Matte Chalk Exterior' },
    ],
    inTheBox: [
      '1× Lumina Terra Fluted Stoneware Vessel',
      '1× Artist Potter Studio Signature Card',
      '1× Natural Cork Base Protector Ring',
    ],
    tags: ['furniture', 'objects', 'ceramic', 'craft', 'new'],
    seo: {
      title: 'Terra Fluted Stoneware Vessel | Lumina',
      description: 'Wheel-thrown stoneware ceramic with rhythmic vertical fluting.',
    },
  },
];

export function getMockProducts(params?: {
  limit?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
}): Product[] {
  let list = [...MOCK_PRODUCTS];

  if (params?.query) {
    const q = params.query.toLowerCase().trim();
    list = list.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.modelNumber?.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (params?.sortKey) {
    switch (params.sortKey) {
      case 'PRICE':
        list.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return params.reverse ? priceB - priceA : priceA - priceB;
        });
        break;
      case 'TITLE':
        list.sort((a, b) => {
          const res = a.title.localeCompare(b.title);
          return params.reverse ? -res : res;
        });
        break;
      default:
        if (params.reverse) {
          list.reverse();
        }
        break;
    }
  }

  if (params?.limit && params.limit > 0) {
    return list.slice(0, params.limit);
  }

  return list;
}

export function getMockCollections(): Collection[] {
  return MOCK_COLLECTIONS;
}

export function getMockProduct(handle: string): Product | null {
  const products = MOCK_PRODUCTS;
  return products.find(p => p.handle === handle) || products[0] || null;
}

export function getMockCollection(handle: string): Collection | null {
  const collections = MOCK_COLLECTIONS;
  return collections.find(c => c.handle === handle) || collections[0] || null;
}

export function getMockCollectionProducts(params: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  reverse?: boolean;
  query?: string;
}): Product[] {
  const { collection, limit, reverse, query, sortKey } = params;

  let list = [...MOCK_PRODUCTS];

  if (collection && collection !== 'joyco-root') {
    if (collection === 'frontpage' || collection === 'featured') {
      list = list.filter(p => p.tags.includes('featured') || p.tags.includes('bestseller'));
    } else if (collection === 'new-arrivals') {
      list = list.filter(p => p.tags.includes('new'));
    } else {
      list = list.filter(
        p => p.categoryId === collection || p.tags.includes(collection)
      );
    }
  }

  if (query) {
    const q = query.toLowerCase().trim();
    list = list.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.modelNumber?.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sortKey === 'PRICE') {
    list.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (reverse) {
    list.reverse();
  }

  if (limit && limit > 0) {
    return list.slice(0, limit);
  }

  return list;
}
