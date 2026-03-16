import { notFound } from 'next/navigation';
import ItemCard from '@/components/ItemCard';
import CategoryFilters from '@/components/CategoryFilters';

export const dynamic = 'force-dynamic';

async function getCategory(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return null;
    const cats = await res.json();
    return cats.find((c: any) => c.slug === slug) || null;
  } catch {
    return null;
  }
}

async function getItems(slug: string, sort = 'rating', priceRange = '') {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const params = new URLSearchParams({ category: slug, sort });
    if (priceRange) params.set('priceRange', priceRange);
    const res = await fetch(`${baseUrl}/api/items?${params}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sort?: string; priceRange?: string };
}) {
  const [category, items] = await Promise.all([
    getCategory(params.slug),
    getItems(params.slug, searchParams.sort, searchParams.priceRange),
  ]);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-dark-800 to-dark-900 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-serif text-white">{category.name}</h1>
              <p className="text-dark-300 mt-1">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-dark-400">
              {category.itemCount} {category.itemCount === 1 ? 'item' : 'items'} curated
            </span>
          </div>
        </div>
      </section>

      {/* Filters & Items */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters
          currentSort={searchParams.sort || 'rating'}
          currentPriceRange={searchParams.priceRange || ''}
          slug={params.slug}
        />

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {items.map((item: any) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h2 className="text-2xl font-serif text-white mb-3">No items found</h2>
            <p className="text-dark-400">Try adjusting your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
