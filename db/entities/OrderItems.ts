import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_items', { schema: 'setel-assessment' })
export class OrderItems {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('integer', { name: 'user_id', nullable: true })
  user_id: number | null;

  @Column('integer', { name: 'orderId', nullable: true })
  order_id: number | null;

  @Column('varchar', { name: 'name', nullable: true })
  name: number | null;

  @Column('integer', { name: 'amount', nullable: true })
  amount: number | null;

  @Column('decimal', { name: 'unit_price', nullable: true })
  unit_price: number | null;

  @Column('integer', { name: 'created_by', nullable: true })
  created_by: number | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  created_at: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updated_by: number | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updated_at: Date | null;
}
