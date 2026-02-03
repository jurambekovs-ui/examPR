import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Roles } from '../../common/enums/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
