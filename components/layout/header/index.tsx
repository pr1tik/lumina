'use client';

import MobileMenu from './mobile-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogoSvg } from './logo-svg';
import CartModal from '@/components/cart/modal';
import { NavItem } from '@/lib/types';
import { Collection } from '@/lib/shopify/types';
import { Search } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Featured',
    href: '/shop/frontpage',
  },
  {
    label: 'Lighting',
    href: '/shop/lighting',
  },
  {
    label: 'Acoustics',
    href: '/shop/audio',
  },
  {
    label: 'Timepieces',
    href: '/shop/timepieces',
  },
  {
    label: 'Shop All',
    href: '/shop',
  },
];

interface HeaderProps {
  collections: Collection[];
}

export function Header({ collections }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-sides h-16 md:h-20 flex items-center justify-between">
        
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <MobileMenu collections={collections} />
          </div>
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity" prefetch>
            <LogoSvg />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200',
                  isActive
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                )}
                prefetch
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick Search + Cart */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/shop"
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border border-border bg-muted/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
            title="Search catalog"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
          </Link>

          <CartModal />
        </div>

      </div>
    </header>
  );
}
