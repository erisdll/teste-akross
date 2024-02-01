import { Squad } from '../entities/squad.entity';
/**
 * @interface ISquadCount
 * Represents the structure for a response object containing an array of Squad entities and a count.
 */
export interface ISquadCount {
  /**
   * @property squads
   * Array of Squad entities.
   */
  squads: Squad[];
  /**
   * @property count
   * Number of squads in the array.
   */
  count: number;
}
