import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Item } from '@/lib/entities/Item';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const ds = await getDataSource();
    const itemRepo = ds.getRepository(Item);

    const item = await itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.slug = :slug', { slug: params.slug })
      .getOne();

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}
