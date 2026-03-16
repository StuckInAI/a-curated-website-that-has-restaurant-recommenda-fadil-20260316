import Link from 'next/link';
import StarRating from './StarRating';
import PriceRange from './PriceRange';

interface ItemCardProps {
  item: {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    rating: number;
    priceRange: string;
    category: { name: string; slug: string; icon: string };
    tags: string[];
    featured: boolean;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/item/${item.slug}`} className="block group">
      <div className="bg-dark-800 border border-dark-700 group-hover:border-gold-500/30 rounded-2xl overflow-hidden card-hover transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[16/9] bg-dark-700 overflow-hidden">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl">{item.category?.icon}</span>
            </div>
          )}
          {item.featured && (
            <div className="absolute top-3 left-3 bg-gold-500 text-dark-900 text-xs font-semibold px-2.5 py-1 rounded-full">
              Pick
            </div>
          )}
          <div className="absolute top-3 right-3 bg-dark-900/70 backdrop-blur-sm text-dark-200 text-xs px-2.5 py-1 rounded-full">
            {item.category?.icon} {item.category?.name}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg text-white mb-2 group-hover:text-gold-300 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <StarRating rating={item.rating} small />
            <PriceRange priceRange={item.priceRange} />
          </div>
        </div>
      </div>
    </Link>
  );
}
