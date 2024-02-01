import { Collaborator } from '../entities/collaborator.entity';
/**
 * @interface ICollaboratorCount
 * Represents the structure for a response object containing an array of Collaborator entities and a count.
 */
export interface ICollaboratorCount {
  /**
   * @property collaborators
   * Array of Collaborator entities.
   */
  collaborators: Collaborator[];
  /**
   * @property count
   * Number of collaborators in the array.
   */
  count: number;
}
