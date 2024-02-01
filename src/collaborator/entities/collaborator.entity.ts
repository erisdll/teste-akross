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
/**
 * @entity Collaborator
 * Represents the Collaborator entity in the database.
 */
@Entity('collaborators')
export class Collaborator {
  /**
   * @primaryGeneratedColumn
   * Unique identifier for the collaborator, generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * @column
   * First name of the collaborator, limited to 50 characters.
   */
  @Column({ length: 50 })
  firstName: string;
  /**
   * @column
   * Last name of the collaborator, limited to 100 characters.
   */
  @Column({ length: 100 })
  lastName: string;
  /**
   * @column
   * Unique email address of the collaborator.
   */
  @Column({ unique: true })
  email: string;
  /**
   * @column
   * Role of the collaborator, limited to 50 characters.
   */
  @Column({ length: 50 })
  role: string;
  /**
   * @manyToOne
   * Many-to-One relationship with the Squad entity, representing the squad to which the collaborator belongs.
   */
  @ManyToOne(() => Squad, (squad) => squad.collaborators)
  @JoinColumn()
  squad: Squad;
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
   * Date when the collaborator was last updated, not included in the default select.
   * Defaults to the current timestamp on creation and updates.
   */
  @UpdateDateColumn({
    select: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  /**
   * @column
   * Indicates whether the collaborator is active, defaulting to true.
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;
}
