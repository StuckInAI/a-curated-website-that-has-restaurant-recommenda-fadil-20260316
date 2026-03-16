import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  itemCount: number;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-dark-800 rounded-2xl h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="group relative bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-gold-500/40 rounded-2xl p-8 card-hover transition-all duration-300"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {cat.icon}
          </div>
          <h3 className="text-xl font-serif text-white mb-2 group-hover:text-gold-300 transition-colors">
            {cat.name}
          </h3>
          <p className="text-dark-400 text-sm leading-relaxed mb-4">{cat.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-500">
              {cat.itemCount} {cat.itemCount === 1 ? 'item' : 'items'}
            </span>
            <span className="text-gold-500 text-sm group-hover:translate-x-1 transition-transform duration-200">
              Explore →
            </span>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-transparent transition-all duration-300" />
        </Link>
      ))}
    </div>
  );
}
