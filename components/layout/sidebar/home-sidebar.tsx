import { ShopLinks } from '../shop-links';
import { Collection } from '@/lib/shopify/types';

interface HomeSidebarProps {
  collections: Collection[];
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        <p className="italic tracking-tighter text-base">Bold. Vibrant. Unapologetic.</p>
        <div className="mt-5 text-base leading-tight">
          <p>Designs that demand attention.</p>
          <p>Vibrant colors, crafted with passion.</p>
          <p>Elegance with a wink — style first</p>
        </div>
      </div>
      <ShopLinks collections={collections} />
    </aside>
  );
}
