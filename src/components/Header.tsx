'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NAV_CATEGORIES = [
  { name: 'Restaurants', slug: 'restaurants', icon: '🍽️' },
  { name: 'Audio', slug: 'high-end-audio', icon: '🎧' },
  { name: 'Watches', slug: 'luxury-watches', icon: '⌚' },
  { name: 'Tech', slug: 'curated-tech', icon: '💻' },
  { name: 'Spirits', slug: 'fine-spirits', icon: '🥃' },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700/60'
          : 'bg-dark-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-900 font-bold text-sm">
              C
            </div>
            <span className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors">
              Curated
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 text-dark-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-dark-700/50 transition-all text-sm"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-dark-800 border border-dark-600 text-white text-sm rounded-full pl-9 pr-4 py-2 w-44 focus:w-56 transition-all duration-300 focus:outline-none focus:border-gold-500/50 placeholder-dark-500"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-dark-300 hover:text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-dark-700 py-4 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="sm:hidden mb-4 px-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recommendations..."
                  className="w-full bg-dark-800 border border-dark-600 text-white text-sm rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold-500/50 placeholder-dark-500"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-dark-300 hover:text-white px-4 py-2.5 rounded-lg hover:bg-dark-700/50 transition-all"
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
