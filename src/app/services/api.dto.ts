import { ThingInterface } from '../models/thing.model';
import { AttachInterface } from '../models/attach.model';

export interface ThingDto extends Omit<ThingInterface, 'id'> {
  id?: string;
  size: number;
  type: 'element' | 'container';
}

export interface AttachDto extends AttachInterface {
  thing: string;
  container: string;
}

export interface LoadDto {
  things: ThingDto[];
  attaches: AttachDto[];
}
