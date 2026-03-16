import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Item } from '@/lib/entities/Item';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ds = await getDataSource();
    const itemRepo = ds.getRepository(Item);

    const items = await itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.featured = :featured', { featured: true })
      .orderBy('item.rating', 'DESC')
      .getMany();

    const serialized = items.map((item) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Error fetching featured items:', error);
    return NextResponse.json({ error: 'Failed to fetch featured items' }, { status: 500 });
  }
}
