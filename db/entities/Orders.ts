import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders', { schema: 'setel-assessment' })
export class Orders {
  static readonly STATUS_PENDING = 0;
  static readonly STATUS_CONFIRMED = 1;
  static readonly STATUS_CANCEL = 2;
  static readonly STATUS_DELIVERED = 3;

  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('integer', { name: 'user_id', nullable: true })
  user_id: number | null;

  @Column('decimal', { name: 'total', nullable: true })
  total: number | null;

  @Column('integer', { name: 'status', nullable: true })
  status: number | null;

  @Column('integer', { name: 'created_by', nullable: true })
  created_by: number | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  created_at: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updated_by: number | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updated_at: Date | null;
}
