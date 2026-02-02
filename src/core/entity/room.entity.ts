import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int' })
  pricePerNight: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'bool', default: true })
  isAvailable: boolean;
}
