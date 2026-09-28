import { LogoSvg } from './header/logo-svg';
import { ShopLinks } from './shop-links';
import { SidebarLinks } from './sidebar/product-sidebar-links';
import { FooterNewsletter } from './footer-newsletter';
import { getCollections } from '@/lib/shopify';
import Link from 'next/link';

export async function Footer() {
  const collections = await getCollections();

  return (
    <footer className="p-sides mt-12">
      <div className="w-full min-h-[500px] p-sides md:p-12 text-background bg-foreground rounded-[16px] flex flex-col justify-between gap-12">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-md">
            <LogoSvg className="max-w-[280px] h-auto block" />
            <p className="text-xs uppercase tracking-widest text-background/60 font-mono mt-1">
              Precision Acoustics • Architectural Lighting • Minimalist Objects
            </p>
            <div className="mt-4">
              <FooterNewsletter />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <ShopLinks collections={collections} label="Collections" align="left" />

            <div className="text-left">
              <h4 className="text-lg font-extrabold md:text-xl">Studio</h4>
              <ul className="flex flex-col gap-1.5 leading-5 mt-5 text-sm text-background/70">
                <li><Link href="/shop" className="hover:text-background transition-colors">Manifesto</Link></li>
                <li><Link href="/shop" className="hover:text-background transition-colors">Acoustic Lab</Link></li>
                <li><Link href="/shop" className="hover:text-background transition-colors">Exhibitions</Link></li>
                <li><Link href="/shop" className="hover:text-background transition-colors">Press Inquiries</Link></li>
              </ul>
            </div>

            <div className="text-left col-span-2 md:col-span-1">
              <h4 className="text-lg font-extrabold md:text-xl">Client Care</h4>
              <ul className="flex flex-col gap-1.5 leading-5 mt-5 text-sm text-background/70">
                <li><Link href="/checkout" className="hover:text-background transition-colors">Order Status</Link></li>
                <li><Link href="/shop" className="hover:text-background transition-colors">White Glove Delivery</Link></li>
                <li><Link href="/shop" className="hover:text-background transition-colors">Warranty & Repairs</Link></li>
                <li><Link href="/shop" className="hover:text-background transition-colors">Authenticity Registry</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-background/15 text-xs text-background/50">
          <SidebarLinks className="max-w-[450px] w-full max-md:flex-col" size="sm" invert />
          <div className="flex items-center gap-4">
            <span>Encrypted Checkout</span>
            <span>•</span>
            <span>Carbon Neutral Delivery</span>
            <span>•</span>
            <p>© {new Date().getFullYear()} Lumina Design Lab Inc.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
