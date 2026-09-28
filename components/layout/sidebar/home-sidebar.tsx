import { ShopLinks } from '../shop-links';
import { Collection } from '@/lib/shopify/types';

interface HomeSidebarProps {
  collections: Collection[];
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        <p className="italic tracking-tighter text-base font-semibold">Pure Form. Acoustic Precision. Sculptural Light.</p>
        <div className="mt-5 text-base leading-relaxed text-muted-foreground">
          <p>Every Lumina artifact is an exercise in architectural restraint and material permanence.</p>
          <p className="mt-2 text-foreground/80">Engineered with aerospace alloys, natural marble, and tactile textiles.</p>
          <p className="mt-4 text-xs font-mono uppercase tracking-widest opacity-60">Design Studio • New York & Stockholm</p>
        </div>
      </div>
      <ShopLinks collections={collections} />
    </aside>
  );
}
