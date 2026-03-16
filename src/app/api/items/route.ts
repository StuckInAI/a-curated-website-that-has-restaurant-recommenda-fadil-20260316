import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Item } from '@/lib/entities/Item';
import { Category } from '@/lib/entities/Category';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const itemRepo = ds.getRepository(Item);
    const categoryRepo = ds.getRepository(Category);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'rating';
    const priceRange = searchParams.get('priceRange') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    let qb = itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category');

    if (category) {
      qb = qb.andWhere('category.slug = :categorySlug', { categorySlug: category });
    }

    if (search) {
      qb = qb.andWhere(
        '(LOWER(item.title) LIKE :search OR LOWER(item.description) LIKE :search OR LOWER(item.tags) LIKE :search)',
        { search: `%${search.toLowerCase()}%` }
      );
    }

    if (priceRange) {
      qb = qb.andWhere('item.priceRange = :priceRange', { priceRange });
    }

    switch (sort) {
      case 'rating':
        qb = qb.orderBy('item.rating', 'DESC');
        break;
      case 'newest':
        qb = qb.orderBy('item.createdAt', 'DESC');
        break;
      case 'title':
        qb = qb.orderBy('item.title', 'ASC');
        break;
      default:
        qb = qb.orderBy('item.rating', 'DESC');
    }

    const total = await qb.getCount();
    const items = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const serialized = items.map((item) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    }));

    return NextResponse.json({
      items: serialized,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const itemRepo = ds.getRepository(Item);
    const categoryRepo = ds.getRepository(Category);

    const body = await request.json();
    const {
      title,
      slug,
      description,
      longDescription,
      imageUrl,
      rating,
      priceRange,
      categorySlug,
      tags,
      featured,
    } = body;

    if (!title || !slug || !description || !categorySlug) {
      return NextResponse.json(
        { error: 'title, slug, description, and categorySlug are required' },
        { status: 400 }
      );
    }

    const category = await categoryRepo.findOne({ where: { slug: categorySlug } });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const item = itemRepo.create({
      title,
      slug,
      description,
      longDescription: longDescription || '',
      imageUrl: imageUrl || '',
      rating: rating || 0,
      priceRange: priceRange || '$',
      category,
      tags: tags ? JSON.stringify(tags) : '[]',
      featured: featured || false,
    });

    const saved = await itemRepo.save(item);
    return NextResponse.json({ ...saved, tags: tags || [] }, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
