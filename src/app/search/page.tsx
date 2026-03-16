'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemCard from '@/components/ItemCard';
import Link from 'next/link';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/items?search=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]);

  return (
    <div className="min-h-screen bg-dark-900">
      <section className="bg-gradient-to-b from-dark-800 to-dark-900 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            {query ? (
              <>
                Results for &ldquo;<span className="text-gold-400">{query}</span>&rdquo;
              </>
            ) : (
              'Search'
            )}
          </h1>
          {!loading && query && (
            <p className="text-dark-400">
              {items.length} {items.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-dark-800 rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-serif text-white mb-3">No results found</h2>
            <p className="text-dark-400 mb-8">
              Try a different search term or browse our categories.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 px-6 py-3 rounded-full hover:border-gold-400/60 transition-all"
            >
              Browse all categories
            </Link>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-serif text-white mb-3">What are you looking for?</h2>
            <p className="text-dark-400">Enter a search term above to find recommendations.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-900" />}>
      <SearchContent />
    </Suspense>
  );
}
