import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Category } from '@/lib/entities/Category';
import { Item } from '@/lib/entities/Item';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);
    const itemRepo = ds.getRepository(Item);

    const categories = await categoryRepo.find({
      order: { sortOrder: 'ASC' },
    });

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const itemCount = await itemRepo.count({
          where: { categoryId: cat.id },
        });
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
          sortOrder: cat.sortOrder,
          itemCount,
        };
      })
    );

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
