import { Collaborator } from '../entities/collaborator.entity';

export interface ICollaboratorCount {
  collaborators: Collaborator[];
  count: number;
}
