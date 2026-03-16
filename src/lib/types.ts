export interface CategoryWithCount {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  itemCount: number;
}

export interface ItemWithCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  rating: number;
  priceRange: string;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
  };
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
