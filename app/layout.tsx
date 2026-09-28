import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { CartProvider } from '@/components/cart/cart-context';
import { DebugGrid } from '@/components/debug-grid';
import { isDevelopment } from '@/lib/constants';
import { getCollections } from '@/lib/shopify';
import { Header } from '../components/layout/header';
import dynamic from 'next/dynamic';
import { V0Provider } from '../lib/context';
import { cn } from '../lib/utils';

const V0Setup = dynamic(() => import('@/components/v0-setup'));

const isV0 = process.env['VERCEL_URL']?.includes('vusercontent.net') ?? false;

export const metadata: Metadata = {
  metadataBase: new URL('https://lumina.store'),
  title: 'Lumina | Premium Modern Living & Tech Essentials',
  description: 'Lumina — your premier curated destination for contemporary design, sleek tech, and timeless lifestyle essentials.',
  generator: 'v0.app'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getCollections();

  return (
    <html lang="en">
      <body
        className={cn('antialiased min-h-screen font-sans', { 'is-v0': isV0 })}
        suppressHydrationWarning
      >
        <V0Provider isV0={isV0}>
          <CartProvider>
            <NuqsAdapter>
              <main data-vaul-drawer-wrapper="true">
                <Header collections={collections} />
                {children}
              </main>
              {isDevelopment && <DebugGrid />}
              <Toaster closeButton position="bottom-right" />
            </NuqsAdapter>
          </CartProvider>
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  );
}
