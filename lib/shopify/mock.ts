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
    categoryId: 'lighting',
    description: 'Sculptural spun aluminum pendant casting a continuous warm ambient glow with integrated capacitive touch dimming.',
    descriptionHtml: `
      <div>
        <p>The <strong>Lumina Aura Pendant</strong> redefines residential and studio lighting through monolithic simplicity. Spun from a continuous disc of aviation-grade aluminum, the convex parabolic reflector delivers uniform, glare-free downward illumination while casting a soft ambient halo against the ceiling.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Light Source:</strong> Custom 2700K Warm Warm White CRI 98+ LED engine</li>
          <li><strong>Dimming:</strong> Capacitive touch dimmer and 0-10V architectural wall switch compatible</li>
          <li><strong>Dimensions:</strong> 420mm diameter × 140mm height; 2.5m braided silicone cord</li>
          <li><strong>Materials:</strong> Spun solid aluminum, frosted borosilicate glass diffuser</li>
          <li><strong>Power:</strong> 24W, 2100 lumens, 50,000 hour rated lifespan</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    priceRange: {
      minVariantPrice: { amount: '340', currencyCode: 'USD' },
      maxVariantPrice: { amount: '380', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '420', currencyCode: 'USD' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
      altText: 'Aura Dimmable Pendant Lamp in Matte Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
        altText: 'Aura Dimmable Pendant Lamp in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
        altText: 'Aura Dimmable Pendant Lamp in Anodized Silver',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop',
        altText: 'Aura Dimmable Pendant Lamp in Brushed Brass',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '340', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_aura_silver',
        title: 'Silver',
        availableForSale: true,
        price: { amount: '340', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        id: 'var_aura_gold',
        title: 'Gold',
        availableForSale: true,
        price: { amount: '380', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Gold' }],
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
    categoryId: 'audio',
    description: 'Precision omnidirectional acoustic architecture engineered with dual neodymium drivers and resonant chamber.',
    descriptionHtml: `
      <div>
        <p>The <strong>SoundSphere 360</strong> unites acoustic transparency with tactile sculptural form. Constructed with CNC-machined acoustic mesh and a solid vibration-damping polymer base, it creates a room-filling soundstage regardless of placement.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Acoustic Architecture:</strong> Twin 2.5" neodymium drivers, 4" down-firing passive radiator</li>
          <li><strong>Connectivity:</strong> Bluetooth 5.3 aptX HD, Wi-Fi AirPlay 2, Spotify Connect, USB-C DAC</li>
          <li><strong>Battery Life:</strong> 22 hours continuous playback with fast USB-C charge</li>
          <li><strong>Dimensions:</strong> 180mm diameter × 220mm height; weight 2.8kg</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
    priceRange: {
      minVariantPrice: { amount: '480', currencyCode: 'USD' },
      maxVariantPrice: { amount: '480', currencyCode: 'USD' },
    },
    compareAtPrice: { amount: '550', currencyCode: 'USD' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
      altText: 'SoundSphere 360 Speaker in Matte Black',
      width: 1200,
      height: 1200,
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
        altText: 'SoundSphere 360 Speaker in Matte Black',
        width: 1200,
        height: 1200,
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
        altText: 'SoundSphere 360 Speaker in Matte White',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '480', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_sound_white',
        title: 'White',
        availableForSale: true,
        price: { amount: '480', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'White' }],
      },
      {
        id: 'var_sound_stone',
        title: 'Stone',
        availableForSale: true,
        price: { amount: '480', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
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
    categoryId: 'timepieces',
    description: 'Surgical-grade 316L stainless steel timepiece with Japanese mechanical movement and vegetable-tanned strap.',
    descriptionHtml: `
      <div>
        <p>A masterclass in restraint, the <strong>Lumina Chrono</strong> is engineered for decades of service. Underneath its anti-reflective sapphire crystal sits a clean, unadorned sub-second register powered by a 24-jewel automatic mechanical movement with 42-hour power reserve.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Case Diameter:</strong> 39mm, 9.8mm slim profile, 5 ATM water resistance</li>
          <li><strong>Crystal:</strong> Anti-scratch sapphire crystal with internal anti-reflective coating</li>
          <li><strong>Movement:</strong> Caliber 9015 mechanical automatic, 28,800 bph</li>
          <li><strong>Strap:</strong> 20mm Tuscan vegetable-tanned full-grain leather with quick-release spring bars</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '520', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_chrono_silver',
        title: 'Silver',
        availableForSale: true,
        price: { amount: '520', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        id: 'var_chrono_gold',
        title: 'Gold',
        availableForSale: true,
        price: { amount: '560', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Gold' }],
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
    categoryId: 'furniture',
    description: 'Anatomically sculpted cold-cured foam wrapped in tactile melange wool with seamless matte steel sled base.',
    descriptionHtml: `
      <div>
        <p>The <strong>Ridge Lounge Armchair</strong> offers exceptional ergonomic support with a dramatic architectural silhouette. Designed to cradle the body through subtle pressure-distributing compound curves, it anchors any modern living or gallery space.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Upholstery:</strong> 90% New Zealand Wool, 10% Polyamide (100,000 Martindale rubs)</li>
          <li><strong>Frame:</strong> Internal steel cage encased in high-resilience cold-cured foam</li>
          <li><strong>Base:</strong> Solid 18mm tubular steel with durable satin powder-coat finish</li>
          <li><strong>Dimensions:</strong> 820mm W × 780mm D × 740mm H; Seat height 410mm</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Stone',
        availableForSale: true,
        price: { amount: '890', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
      {
        id: 'var_chair_black',
        title: 'Black',
        availableForSale: true,
        price: { amount: '890', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_chair_olive',
        title: 'Olive',
        availableForSale: true,
        price: { amount: '890', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
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
    categoryId: 'audio',
    description: 'Audiophile open-back planar magnetic transducers delivering razor-sharp transient response and expansive spatial depth.',
    descriptionHtml: `
      <div>
        <p>Engineered for critical listening and studio mastering, the <strong>Ortho Planar Headphones</strong> incorporate ultra-thin nanometer-grade diaphragms suspended between dual symmetric neodymium magnetic arrays. Experience distortion-free sub-bass and crystalline high-frequency extension.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Transducer:</strong> 88mm Planar Magnetic Open-Back Driver</li>
          <li><strong>Frequency Response:</strong> 8Hz – 52,000Hz (±1.5dB)</li>
          <li><strong>Impedance:</strong> 32 Ohms, easily driven by portable devices or dedicated DACs</li>
          <li><strong>Materials:</strong> Aircraft aluminum headband, perforated lambskin leather memory pads</li>
          <li><strong>Cables:</strong> Dual 3.5mm balanced silver-plated OFC copper + 6.35mm gold adapter</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '390', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_ortho_silver',
        title: 'Silver',
        availableForSale: true,
        price: { amount: '390', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
      {
        id: 'var_ortho_navy',
        title: 'Navy',
        availableForSale: true,
        price: { amount: '390', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Navy' }],
      },
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
    categoryId: 'furniture',
    description: 'Milled from a solid monolith of natural marble with hand-beveled edges and protective silicone underside.',
    descriptionHtml: `
      <div>
        <p>Substantial and tactile, the <strong>Monolith Tray</strong> brings geological presence to desks, vanities, or coffee tables. Each piece is carved from a single slab of natural marble and hand-honed to a low-sheen satin finish.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Material:</strong> Authentic solid marble with subtle organic veining</li>
          <li><strong>Dimensions:</strong> 300mm length × 180mm width × 28mm thickness</li>
          <li><strong>Weight:</strong> 1.95kg solid mass</li>
          <li><strong>Care:</strong> Sealed with food-safe biological matte stone protector</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '160', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_tray_white',
        title: 'White',
        availableForSale: true,
        price: { amount: '160', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'White' }],
      },
      {
        id: 'var_tray_green',
        title: 'Green',
        availableForSale: true,
        price: { amount: '160', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Green' }],
      },
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
    categoryId: 'lighting',
    description: 'Cantilevered architectural desk lamp with magnetic ball-joint pivot and circadian spectrum adjustment.',
    descriptionHtml: `
      <div>
        <p>The <strong>Eclipse Desk Beacon</strong> combines micro-mechanical precision with intelligent illumination. Its counter-balanced arm glides smoothly on sealed bearings, staying locked in position while the magnetic luminaire rotates 360 degrees for direct task focus or indirect wall washing.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Circadian Tuning:</strong> 1800K candlelight to 4500K daylight with zero flicker</li>
          <li><strong>Optics:</strong> Asymmetric TIR lens eliminating eye fatigue and monitor glare</li>
          <li><strong>Knurled Controls:</strong> Solid brass rotary dial for smooth stepless dimming</li>
          <li><strong>Base:</strong> Heavy cast-iron counterweight with recessed wireless charging pad</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '280', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_eclipse_sand',
        title: 'Sand',
        availableForSale: true,
        price: { amount: '280', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Sand' }],
      },
      {
        id: 'var_eclipse_olive',
        title: 'Olive',
        availableForSale: true,
        price: { amount: '280', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
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
    categoryId: 'accessories',
    description: 'Vegetable-tanned Tuscan leather folio featuring magnetic gusset, microfiber interior, and cable routing.',
    descriptionHtml: `
      <div>
        <p>Designed for mobile professionals and creative directors, the <strong>Strata Leather Folio</strong> houses up to a 14" MacBook or 13" iPad Pro alongside notebooks, charging cables, stylus, and cards in an ultra-slim 18mm silhouette.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Leather:</strong> Certified Italian full-grain vegetable-tanned leather that develops rich patina</li>
          <li><strong>Lining:</strong> Ultrasuede microfiber scratch-free interior</li>
          <li><strong>Closure:</strong> Concealed German neodymium magnetic closures</li>
          <li><strong>Dimensions:</strong> 340mm × 245mm × 20mm</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '195', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_folio_brown',
        title: 'Brown',
        availableForSale: true,
        price: { amount: '195', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Brown' }],
      },
      {
        id: 'var_folio_tan',
        title: 'Tan',
        availableForSale: true,
        price: { amount: '195', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Tan' }],
      },
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
    categoryId: 'timepieces',
    description: 'Cast architectural concrete dial accented with brushed solid brass hands and whisper-silent sweep movement.',
    descriptionHtml: `
      <div>
        <p>The <strong>Solstice Table Clock</strong> explores the intersection of raw geological material and horological refinement. Individually cast in high-density aggregate concrete with micro-chamfered hourly indices and solid satin brass needles.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Movement:</strong> Continuous sweep high-torque quartz (zero audible ticking)</li>
          <li><strong>Body:</strong> Fiber-reinforced architectural micro-concrete with beeswax seal</li>
          <li><strong>Hands:</strong> CNC stamped solid brass with matte lacquer</li>
          <li><strong>Dimensions:</strong> 160mm diameter × 65mm depth; weight 1.4kg</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Stone',
        availableForSale: true,
        price: { amount: '210', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
      {
        id: 'var_clock_black',
        title: 'Black',
        availableForSale: true,
        price: { amount: '210', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_clock_terra',
        title: 'Terracotta',
        availableForSale: true,
        price: { amount: '210', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Terracotta' }],
      },
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
    categoryId: 'lighting',
    description: 'Slender vertical floor monolith delivering 3200-lumen indirect architectural wash with Zigbee & Matter connectivity.',
    descriptionHtml: `
      <div>
        <p>Transforming vertical volume with soft architectural washes, the <strong>Arc Floor Pillar</strong> is extruded from a single billet of aluminum. Its hidden 90-degree LED channel projects diffuse light against opposing walls, eliminating glare while visually expanding interior space.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Output:</strong> 3,200 lumens; continuous warm 2200K - 3500K dynamic tuning</li>
          <li><strong>Smart Integration:</strong> Native Matter, Apple HomeKit, Google Home, and Zigbee 3.0</li>
          <li><strong>Height & Weight:</strong> 1780mm tall, 110mm base diameter, 7.2kg weighted cast iron stabilizer</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '650', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_arc_silver',
        title: 'Silver',
        availableForSale: true,
        price: { amount: '650', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Silver' }],
      },
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
    categoryId: 'accessories',
    description: 'Recycled 840D ballistic nylon pack equipped with Fidlock magnetic hardware, YKK Aquaguard zippers, and padded laptop vault.',
    descriptionHtml: `
      <div>
        <p>The <strong>Axis Modular Backpack</strong> adapts seamlessly between weekday commutes and international travel. Engineered with waterproof welded seams, ergonomic air-mesh shoulder harness, and an integrated luggage pass-through.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Capacity:</strong> 22L expandable to 26L via roll-top compression</li>
          <li><strong>Laptop Compartment:</strong> Suspended false-bottom vault fitting up to 16" laptops</li>
          <li><strong>Hardware:</strong> German Fidlock V-buckles and anodized aluminum G-hooks</li>
          <li><strong>Weatherproofing:</strong> IPX4 water-resistant coated Cordura shell</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Black',
        availableForSale: true,
        price: { amount: '265', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
      {
        id: 'var_axis_olive',
        title: 'Olive',
        availableForSale: true,
        price: { amount: '265', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }],
      },
      {
        id: 'var_axis_navy',
        title: 'Navy',
        availableForSale: true,
        price: { amount: '265', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Navy' }],
      },
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
    categoryId: 'furniture',
    description: 'Wheel-thrown stoneware ceramic with rhythmic vertical fluting and reactive matte chalk glaze.',
    descriptionHtml: `
      <div>
        <p>Crafted in limited studio batches in Portugal, the <strong>Terra Fluted Vessel</strong> serves as a focal sculptural centerpiece. Hand-thrown using iron-rich stoneware clay and dipped in a custom unglazed matte slip.</p>
        <h4 style="margin-top: 1rem; font-weight: 700;">Key Specifications</h4>
        <ul>
          <li><strong>Technique:</strong> Wheel-thrown, hand-fluted exterior, glazed watertight interior</li>
          <li><strong>Dimensions:</strong> 280mm height × 170mm maximum diameter</li>
          <li><strong>Finish:</strong> Matte chalk finish with subtle mineral speckling</li>
          <li><strong>Origin:</strong> Handcrafted in Alentejo, Portugal</li>
        </ul>
      </div>
    `,
    availableForSale: true,
    currencyCode: 'USD',
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
        title: 'Sand',
        availableForSale: true,
        price: { amount: '145', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Sand' }],
      },
      {
        id: 'var_vase_terra',
        title: 'Terracotta',
        availableForSale: true,
        price: { amount: '145', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Terracotta' }],
      },
      {
        id: 'var_vase_stone',
        title: 'Stone',
        availableForSale: true,
        price: { amount: '145', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Stone' }],
      },
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
