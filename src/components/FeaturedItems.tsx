import ItemCard from './ItemCard';

interface Item {
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
}

export default function FeaturedItems({ items }: { items: Item[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
