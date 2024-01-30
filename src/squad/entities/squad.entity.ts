import { CollaboratorEntity } from 'src/collaborator/entities/collaborator.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('squads')
export class SquadEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ length: 100 })
  area: string;

  @Column({ type: 'text', nullable: true })
  attributions: string;

  // Relations
  @OneToMany(() => CollaboratorEntity, (collaborator) => collaborator.squad)
  collaborators: CollaboratorEntity[];

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
