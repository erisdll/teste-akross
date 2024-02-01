import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
/**
 * @entity Squad
 * Represents the Squad entity in the database.
 */
@Entity('squads')
export class Squad {
  /**
   * @primaryGeneratedColumn
   * Unique identifier for the squad, auto-incremented.
   */
  @PrimaryGeneratedColumn('increment')
  id: number;
  /**
   * @column
   * Unique name of the squad, limited to 100 characters.
   */
  @Column({ length: 100, unique: true })
  squadName: string;
  /**
   * @column
   * Description of the squad, limited to 500 characters.
   */
  @Column({ length: 500 })
  description: string;
  /**
   * @column
   * Project associated with the squad, limited to 100 characters.
   */
  @Column({ length: 100 })
  project: string;
  /**
   * @oneToMany
   * Relationship with the Collaborator entity, representing the collaborators assigned to the squad.
   * Does not delete collaborators associated with the squad when the squad is deleted, sets the foreign key to null.
   */
  @OneToMany(() => Collaborator, (collaborator) => collaborator.squad, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  collaborators: Collaborator[];
  /**
   * @createDateColumn
   * Date when the squad was created, not included in the default select.
   * Defaults to the current timestamp on creation.
   */
  @CreateDateColumn({
    select: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  /**
   * @updateDateColumn
   * Date when the squad was last updated, not included in the default select.
   * Defaults to the current timestamp on creation and updates.
   */
  @UpdateDateColumn({
    select: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
