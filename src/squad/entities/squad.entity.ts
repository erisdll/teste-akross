import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('squads')
export class Squad {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100, unique: true })
  squadName: string;

  @Column({ length: 500 })
  attributions: string;

  @Column({ length: 100 })
  project: string;

  // Relations
  @OneToMany(() => Collaborator, (collaborator) => collaborator.squad, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  collaborators: Collaborator[];

  // Audit Columns
  @Column({
    select: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    select: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
