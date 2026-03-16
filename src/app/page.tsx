import Link from 'next/link';
import FeaturedItems from '@/components/FeaturedItems';
import CategoryGrid from '@/components/CategoryGrid';

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getFeaturedItems() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items/featured`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [categories, featuredItems] = await Promise.all([
    getCategories(),
    getFeaturedItems(),
  ]);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900 pt-24 pb-20">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">
              Editor&apos;s Selection
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white mb-6 leading-tight">
            Curated picks for the
            <br />
            <span className="gold-gradient font-normal">discerning enthusiast.</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            We believe in fewer, better things. Every recommendation on this site has been
            researched, tested, and selected with uncompromising standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
            >
              Explore Categories
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-dark-600 hover:border-gold-500/50 text-dark-200 hover:text-white px-8 py-3.5 rounded-full transition-all duration-200"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-white mb-3">Browse by Category</h2>
          <p className="text-dark-400">Five areas of refined taste, deeply researched.</p>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section className="py-20 bg-dark-800/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
                  Editor&apos;s Picks
                </span>
                <div className="h-px w-8 bg-gold-500" />
              </div>
              <h2 className="text-3xl font-serif text-white mb-3">Featured Recommendations</h2>
              <p className="text-dark-400">The finest items across all our categories.</p>
            </div>
            <FeaturedItems items={featuredItems} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 border border-dark-600 rounded-2xl p-12">
          <h2 className="text-3xl font-serif text-white mb-4">A different kind of recommendation</h2>
          <p className="text-dark-300 max-w-xl mx-auto mb-8">
            No affiliate links. No sponsored content. No compromises. Just honest curation
            for people who demand the best.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-gold-500/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full transition-all duration-200"
          >
            Read our manifesto →
          </Link>
        </div>
      </section>
    </div>
  );
}
