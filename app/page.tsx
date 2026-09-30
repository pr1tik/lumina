import { PageLayout } from '@/components/layout/page-layout';
import { LatestProductCard } from '@/components/products/latest-product-card';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import { getLabelPosition } from '../lib/utils';
import { Product } from '../lib/shopify/types';
import * as motion from 'motion/react-client';
import Link from 'next/link';

export default async function Home() {
  let featuredProducts: Product[] = [];

  try {
    const allProducts = await getProducts({});
    featuredProducts = allProducts.slice(0, 8);
  } catch (error) {
    featuredProducts = [];
  }

  const [heroProduct, ...restProducts] = featuredProducts;

  return (
    <PageLayout className="bg-neutral-950 text-white min-h-screen">
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        {heroProduct && (
          <>
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 z-0"
            >
              <img
                src={heroProduct.featuredImage.url}
                alt={heroProduct.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
            </motion.div>
            
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-20">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="text-5xl md:text-8xl font-light tracking-tighter mb-6"
              >
                Lumina.
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="text-lg md:text-2xl text-neutral-300 font-light tracking-wide mb-10"
              >
                Precision. Minimal. Uncompromising.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                <Link 
                  href={`/product/${heroProduct.handle}`}
                  className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-neutral-200 transition-colors"
                >
                  Discover {heroProduct.title}
                </Link>
              </motion.div>
            </div>
          </>
        )}
      </section>

      <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">The Collection</h2>
        </motion.div>

        {featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {restProducts.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={index === 0 || index === 3 ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
              >
                <LatestProductCard
                  product={product}
                  labelPosition={getLabelPosition(index)}
                  className="h-full min-h-[400px] md:min-h-[500px]"
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 md:px-8 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">Designed for the Future</h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Every Lumina product is crafted with an obsession for detail, bridging the gap between minimalist aesthetics and bleeding-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: 'Premium Materials', desc: 'Aerospace-grade aluminum, supple vegan leather, and scratch-resistant glass.' },
              { title: 'Audiophile Sound', desc: 'Custom-tuned drivers delivering pristine highs and resonant, deep bass.' },
              { title: 'All-Day Battery', desc: 'Next-generation power efficiency keeps your devices running longer.' }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-900 mb-6 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-neutral-400 font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 via-neutral-900 to-neutral-900" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-6"
          >
            Join the Club
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-400 text-lg mb-10 font-light"
          >
            Subscribe to receive updates, access to exclusive deals, and more.
          </motion.p>
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent border border-neutral-700 px-6 py-4 rounded-full text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            <button 
              type="button"
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>
    </PageLayout>
  );
}
