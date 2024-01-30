import { SquadEntity } from 'src/squad/entities/squad.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('collaborators')
export class CollaboratorEntity {
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

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  // Relations
  @ManyToOne(() => SquadEntity, (squad) => squad.collaborators)
  squad: SquadEntity;

  // Audit Columns
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
