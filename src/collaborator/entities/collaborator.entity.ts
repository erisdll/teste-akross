import { Squad } from 'src/squad/entities/squad.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  // OneToOne,
  // JoinColumn,
} from 'typeorm';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 50 })
  role: string;

  // Relations
  @ManyToOne(() => Squad, (squad) => squad.collaborators)
  @JoinColumn()
  squad: Squad;

  // Audit Columns
  @CreateDateColumn()
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
