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

  @Column({ length: 100 })
  squadName: string;

  @Column({ type: 'text' })
  attributions: string;

  // Relations
  @OneToMany(() => Collaborator, (collaborator) => collaborator.squad, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  collaborators: Collaborator[];

  // Audit Columns
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
