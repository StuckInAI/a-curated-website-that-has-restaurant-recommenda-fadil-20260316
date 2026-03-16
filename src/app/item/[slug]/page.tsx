import { notFound } from 'next/navigation';
import Link from 'next/link';
import StarRating from '@/components/StarRating';
import PriceRange from '@/components/PriceRange';

export const dynamic = 'force-dynamic';

async function getItem(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/items/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const item = await getItem(params.slug);

  if (!item) notFound();

  const tags: string[] = Array.isArray(item.tags) ? item.tags : [];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Breadcrumb */}
      <div className="bg-dark-800/60 border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-dark-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/category/${item.category?.slug}`}
              className="hover:text-gold-400 transition-colors"
            >
              {item.category?.name}
            </Link>
            <span>/</span>
            <span className="text-dark-200">{item.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-dark-800">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl">{item.category?.icon}</span>
                </div>
              )}
            </div>
            {item.featured && (
              <div className="absolute top-4 left-4 bg-gold-500 text-dark-900 text-xs font-semibold px-3 py-1.5 rounded-full">
                Editor&apos;s Pick
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-3">
              <Link
                href={`/category/${item.category?.slug}`}
                className="inline-flex items-center gap-1.5 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-medium px-3 py-1 rounded-full hover:border-gold-400/60 transition-colors"
              >
                <span>{item.category?.icon}</span>
                <span>{item.category?.name}</span>
              </Link>
            </div>

            <h1 className="text-4xl font-serif text-white mb-4">{item.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={item.rating} />
              <span className="text-dark-400 text-sm">{item.rating.toFixed(1)} / 5.0</span>
              <PriceRange priceRange={item.priceRange} />
            </div>

            <p className="text-dark-200 text-lg leading-relaxed mb-8">{item.description}</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-dark-700 text-dark-300 text-xs px-3 py-1.5 rounded-full border border-dark-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="bg-dark-800/60 border border-gold-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gold-500 rounded-full" />
                <h3 className="text-white font-semibold">Why we recommend it</h3>
              </div>
              <p className="text-dark-300 text-sm leading-relaxed">
                This item represents the very best in its category — selected after extensive
                research, testing, and consultation with domain experts. We recommend it without
                reservation to anyone seeking genuine excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Long Description */}
        {item.longDescription && (
          <div className="mt-16">
            <div className="border-t border-dark-700 pt-12">
              <h2 className="text-2xl font-serif text-white mb-6">In depth</h2>
              <div className="max-w-3xl">
                <p className="text-dark-200 leading-relaxed text-lg whitespace-pre-line">
                  {item.longDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16">
          <Link
            href={`/category/${item.category?.slug}`}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
          >
            ← Back to {item.category?.name}
          </Link>
        </div>
      </article>
    </div>
  );
}
