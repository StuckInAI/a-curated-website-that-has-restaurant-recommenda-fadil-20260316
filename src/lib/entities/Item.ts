import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text', nullable: true })
  longDescription!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ type: 'real', default: 0 })
  rating!: number;

  @Column({ nullable: true })
  priceRange!: string;

  @ManyToOne(() => Category, (category) => category.items, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @Column({ nullable: true })
  categoryId!: number;

  @Column({ type: 'text', nullable: true })
  tags!: string;

  @Column({ default: false })
  featured!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
