'use client';

import { useRouter } from 'next/navigation';

interface CategoryFiltersProps {
  currentSort: string;
  currentPriceRange: string;
  slug: string;
}

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'title', label: 'A–Z' },
];

const PRICE_OPTIONS = [
  { value: '', label: 'All Prices' },
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' },
  { value: '$$$$', label: '$$$$' },
];

export default function CategoryFilters({
  currentSort,
  currentPriceRange,
  slug,
}: CategoryFiltersProps) {
  const router = useRouter();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (key !== 'sort') params.set('sort', currentSort);
    else params.set('sort', value);
    if (key !== 'priceRange') {
      if (currentPriceRange) params.set('priceRange', currentPriceRange);
    } else {
      if (value) params.set('priceRange', value);
    }
    router.push(`/category/${slug}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-dark-400 text-sm">Sort:</span>
        <div className="flex gap-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter('sort', opt.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                currentSort === opt.value
                  ? 'bg-gold-500 text-dark-900 font-medium'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 border border-dark-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="flex items-center gap-2">
        <span className="text-dark-400 text-sm">Price:</span>
        <div className="flex gap-1">
          {PRICE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter('priceRange', opt.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                currentPriceRange === opt.value
                  ? 'bg-gold-500 text-dark-900 font-medium'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 border border-dark-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
