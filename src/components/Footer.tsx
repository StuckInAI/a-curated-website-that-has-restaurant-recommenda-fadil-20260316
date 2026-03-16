import Link from 'next/link';

const CATEGORIES = [
  { name: 'Restaurants', slug: 'restaurants' },
  { name: 'High-End Audio', slug: 'high-end-audio' },
  { name: 'Luxury Watches', slug: 'luxury-watches' },
  { name: 'Curated Tech', slug: 'curated-tech' },
  { name: 'Fine Spirits', slug: 'fine-spirits' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700/60 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-900 font-bold text-sm">
                C
              </div>
              <span className="font-serif text-xl text-white">Curated</span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              Lifestyle recommendations for the discerning enthusiast. No affiliate links.
              No sponsored content. Just honest curation.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-dark-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Site</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-dark-400 hover:text-gold-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-dark-400 hover:text-gold-400 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-dark-400 hover:text-gold-400 transition-colors text-sm">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700/60 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} Curated. All rights reserved.
          </p>
          <p className="text-dark-500 text-xs">
            Built with care for those who appreciate excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
