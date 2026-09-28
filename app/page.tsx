import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/page-layout';
import { ProductShowcaseCard } from '@/components/products/product-showcase-card';
import { FlagshipSpotlight } from '@/components/products/flagship-spotlight';
import { Button } from '@/components/ui/button';
import { getCollections, getProducts } from '@/lib/shopify';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Award,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default async function Home() {
  const collections = await getCollections();
  const allProducts = await getProducts({ limit: 12 });

  // Select hero flagship item and featured items
  const flagshipProduct = allProducts.find(p => p.handle === 'lumina-soundsphere-speaker') || allProducts[0];
  const heroShowcaseProduct = allProducts.find(p => p.handle === 'lumina-aura-pendant') || allProducts[1];
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <PageLayout className="bg-background">
      
      {/* 1. Subtle Studio Announcement Bar */}
      <div className="bg-muted border-b border-border text-center py-2.5 px-sides text-xs font-medium text-muted-foreground flex items-center justify-center gap-2">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-foreground font-semibold">SERIES 2026:</span>
        <span>The Architectural Collection is now available worldwide. Complimentary insured shipping over $250.</span>
        <Link href="/shop/new-arrivals" className="text-foreground underline underline-offset-2 hover:opacity-80 ml-1">
          Explore Drop →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-sides">
        
        {/* 2. Hero Section: Cinematic Luxury Experience */}
        <section className="relative my-6 md:my-10 rounded-3xl overflow-hidden border border-border min-h-[560px] md:min-h-[640px] flex items-end p-6 sm:p-10 md:p-16 bg-neutral-950">
          
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2000&auto=format&fit=crop"
              alt="Lumina Aura Pendant in architectural minimalist setting"
              fill
              priority
              quality={95}
              className="object-cover opacity-60 mix-blend-luminosity scale-105"
            />
            {/* Gradient overlays for crisp contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl flex flex-col gap-6">
            
            {/* Studio Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/10 backdrop-blur-md text-white border border-white/20">
                Design Studio • New York & Stockholm
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
                Pure Form. <br />
                <span className="text-neutral-400">Acoustic Precision.</span> <br />
                Sculptural Light.
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed mt-2">
                An uncompromising collection of architectural lighting, audiophile planar transducers, and precision horology engineered from solid milled alloys and honed natural stone.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" className="h-12 px-7 text-sm font-semibold bg-white text-black hover:bg-neutral-200">
                <Link href="/shop" className="flex items-center gap-2">
                  <span>Explore Catalogue</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="h-12 px-6 text-sm font-semibold border-white/30 text-white bg-white/5 backdrop-blur-md hover:bg-white/10">
                <Link href={`/product/${heroShowcaseProduct.handle}`}>
                  Discover Aura Pendant
                </Link>
              </Button>
            </div>

            {/* Key Value Micro-Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Star className="size-3.5 text-amber-400 fill-amber-400" />
                <span>4.9★ Collector Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 text-neutral-400" />
                <span>Insured Global Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="size-3.5 text-neutral-400" />
                <span>30-Day Studio Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-neutral-400" />
                <span>2-Year Warranty</span>
              </div>
            </div>

          </div>

        </section>


        {/* 3. Curated Collections: Visual Editorial Grid */}
        <section className="my-16 md:my-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                The Four Pillars
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Curated Collections
              </h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <span>View All 12 Pieces</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category 1: Lighting */}
            <Link
              href="/shop/lighting"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-popover block"
            >
              <Image
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"
                alt="Lighting Collection"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                  Collection 01
                </span>
                <h3 className="text-xl font-bold mb-1">Lighting & Ambience</h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Dimmable circadian beacons, sculptural pendants, and indirect wall monoliths.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Series</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>

            {/* Category 2: Audio */}
            <Link
              href="/shop/audio"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-popover block"
            >
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                alt="Audio Collection"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                  Collection 02
                </span>
                <h3 className="text-xl font-bold mb-1">Acoustics & Sound</h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Planar magnetic studio transducers and 360° omnidirectional acoustic speakers.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Series</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>

            {/* Category 3: Timepieces */}
            <Link
              href="/shop/timepieces"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-popover block"
            >
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
                alt="Timepieces Collection"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                  Collection 03
                </span>
                <h3 className="text-xl font-bold mb-1">Time & Precision</h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Mechanical automatic timepieces and architectural concrete desk instruments.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Series</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>

            {/* Category 4: Living & Workspace */}
            <Link
              href="/shop/furniture"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-popover block"
            >
              <Image
                src="https://images.unsplash.com/photo-1580481077195-c2662095b34a?q=80&w=800&auto=format&fit=crop"
                alt="Living & Workspace Collection"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                  Collection 04
                </span>
                <h3 className="text-xl font-bold mb-1">Living & Objects</h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Anatomical cold-cured wool seating and solid honed Nero Marquina marble trays.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Series</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>

          </div>
        </section>


        {/* 4. Flagship Spotlight Component */}
        <FlagshipSpotlight product={flagshipProduct} />


        {/* 5. Coveted Showpieces Grid */}
        <section className="my-16 md:my-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Studio Catalog
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Coveted Showpieces
              </h2>
            </div>
            
            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Button asChild size="sm" variant="secondary" className="rounded-full text-xs">
                <Link href="/shop">All Items</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="rounded-full text-xs">
                <Link href="/shop/lighting">Lighting</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="rounded-full text-xs">
                <Link href="/shop/audio">Acoustics</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="rounded-full text-xs">
                <Link href="/shop/timepieces">Timepieces</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductShowcaseCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-sm font-semibold">
              <Link href="/shop" className="flex items-center gap-2">
                <span>View Complete Studio Archive</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>


        {/* 6. Brand Story & Craftsmanship: The Art of Restraint */}
        <section className="my-16 md:my-24 p-8 md:p-16 rounded-3xl bg-muted/40 border border-border">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">
              Studio Manifesto
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              The Art of Architectural Restraint
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We reject the transient cycles of consumer electronics and disposable home goods. Lumina designs with permanence: pure geometric form, tactile materials, and honest mechanical assemblies meant to outlive trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-popover/80 border border-border/60">
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-foreground mb-1">
                <Layers className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Material Permanence</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Zero faux veneers. We mill solid aerospace alloys, carve Spanish Nero Marquina marble, and source virgin New Zealand wool that patinates with generational character.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-popover/80 border border-border/60">
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-foreground mb-1">
                <Sliders className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Acoustic & Optical Calibration</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tuned in dedicated acoustic chambers to minimize harmonic fatigue. Our circadian luminaires maintain 98+ CRI natural spectrum illumination.
              </p>
            </div>

            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-popover/80 border border-border/60">
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-foreground mb-1">
                <Award className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Generational Right to Repair</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Modular internal sub-assemblies secured with precision metric fasteners. We guarantee individual component and driver replacement availability for a minimum of 10 years.
              </p>
            </div>
          </div>
        </section>


        {/* 7. Press Accolades */}
        <section className="my-16 md:my-20 border-y border-border py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-serif italic font-bold text-xl md:text-2xl text-foreground">“Wallpaper*”</p>
              <p className="text-xs text-muted-foreground max-w-[200px]">“The pinnacle of minimalist industrial design in the modern era.”</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-serif italic font-bold text-xl md:text-2xl text-foreground">“Monocle”</p>
              <p className="text-xs text-muted-foreground max-w-[200px]">“Audio architecture that belongs in a permanent museum of modern art.”</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-serif italic font-bold text-xl md:text-2xl text-foreground">“Design Milk”</p>
              <p className="text-xs text-muted-foreground max-w-[200px]">“Sensory perfection. Form and function operating in total harmony.”</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-serif italic font-bold text-xl md:text-2xl text-foreground">“AD”</p>
              <p className="text-xs text-muted-foreground max-w-[200px]">“Lumina elevates daily workspace and living rituals into art.”</p>
            </div>
          </div>
        </section>


        {/* 8. Collector Testimonials */}
        <section className="my-16 md:my-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-2">
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              From Studio Collectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-muted/60 border border-border flex flex-col justify-between gap-6">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">
                  “The Aura Pendant transformed our entire dining gallery. The touch-dimming is instantaneous and the parabolic reflection creates zero glare. Absolute museum quality.”
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">Marcus Sterling</p>
                  <p className="text-muted-foreground">Architect, Zurich</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                  Verified Owner
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/60 border border-border flex flex-col justify-between gap-6">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">
                  “The SoundSphere 360 is easily the most coherent omnidirectional speaker I’ve tested in two decades of audio engineering. Clean transients and zero cabinet resonance.”
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">Dr. Elena Kurosawa</p>
                  <p className="text-muted-foreground">Acoustic Consultant, Tokyo</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                  Verified Owner
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/60 border border-border flex flex-col justify-between gap-6">
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">
                  “The Chrono Automatic in Obsidian Black has become my daily companion. Surgical finish, superb weight, and the quick-release Tuscan leather strap is sublime.”
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">Julian Hayes</p>
                  <p className="text-muted-foreground">Creative Director, London</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                  Verified Owner
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

    </PageLayout>
  );
}
