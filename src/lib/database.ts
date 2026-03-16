import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import { Category } from './entities/Category';
import { Item } from './entities/Item';

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'database.sqlite');

let dataSource: DataSource | null = null;
let initialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && initialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    entities: [Category, Item],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  initialized = true;

  // Run seed if needed
  const { seedDatabase } = await import('./seed');
  await seedDatabase(dataSource);

  return dataSource;
}
