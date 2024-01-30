import { IsEmail } from 'class-validator';
import { Squad } from 'src/squad/entities/squad.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ length: 50 })
  role: string;

  // Relations
  @ManyToOne(() => Squad, (squad) => squad.collaborators)
  squad: Squad;

  // Audit Columns
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
