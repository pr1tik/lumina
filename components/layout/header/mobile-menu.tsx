'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { navItems } from './index';
import { SidebarLinks } from '../sidebar/product-sidebar-links';
import { Collection } from '@/lib/shopify/types';
import { useBodyScrollLock } from '@/lib/hooks/use-body-scroll-lock';
import { Menu, X, ArrowRight, Search } from 'lucide-react';

interface MobileMenuProps {
  collections: Collection[];
}

export default function MobileMenu({ collections }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // Lock body scroll when menu is open
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  return (
    <>
      <Button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        variant="ghost"
        size="sm"
        className="px-2 md:hidden"
      >
        <Menu className="size-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 bottom-0 left-0 flex w-full max-w-xs sm:max-w-sm p-3 z-50"
            >
              <div className="flex flex-col p-5 w-full rounded-xl bg-muted border border-border shadow-2xl overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="font-black text-xl tracking-tight">LUMINA</span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-2">NAVIGATION</span>
                  </div>
                  <Button size="icon-sm" variant="ghost" aria-label="Close menu" onClick={closeMobileMenu}>
                    <X className="size-4" />
                  </Button>
                </div>

                {/* Mobile Search Link */}
                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between p-3 rounded-lg bg-background border border-border text-sm text-muted-foreground mb-6"
                >
                  <span className="flex items-center gap-2">
                    <Search className="size-4" />
                    <span>Search catalogue...</span>
                  </span>
                  <ArrowRight className="size-4" />
                </Link>

                <nav className="flex flex-col gap-1.5 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Explore
                  </span>
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between ${
                        pathname === item.href
                          ? 'bg-foreground text-background'
                          : 'text-foreground/80 hover:bg-background/80 hover:text-foreground'
                      }`}
                      prefetch
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="size-3.5 opacity-60" />
                    </Link>
                  ))}
                </nav>

                {/* Curated Categories */}
                <div className="mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                    Curations
                  </span>
                  <div className="flex flex-col gap-1">
                    {collections.map(col => (
                      <Link
                        key={col.handle}
                        href={`/shop/${col.handle}`}
                        onClick={closeMobileMenu}
                        className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {col.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-border/80 text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">Lumina Design Studio</p>
                  <p className="leading-relaxed">Architectural acoustics, circadian lighting, and timeless minimal essentials.</p>
                  <div className="mt-4">
                    <SidebarLinks className="gap-2 w-full" size="sm" />
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
