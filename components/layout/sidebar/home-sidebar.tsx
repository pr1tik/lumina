import { ShopLinks } from '../shop-links';
import { Collection } from '@/lib/shopify/types';

interface HomeSidebarProps {
  collections: Collection[];
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-light tracking-tight mb-6 text-foreground">Lumina.</h1>
        <p className="text-xl tracking-tight font-medium text-neutral-800 dark:text-neutral-200">Precision. Minimal. Uncompromising.</p>
        <div className="mt-5 text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
          <p>Next-generation technology designed</p>
          <p>for the modern aesthetic.</p>
          <p className="mt-4">Experience sound, vision, and productivity</p>
          <p>without distraction.</p>
        </div>
      </div>
      <ShopLinks collections={collections} />
    </aside>
  );
}
