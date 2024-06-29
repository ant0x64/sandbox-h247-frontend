import { ThingInterface } from './thing.model';
import { AttachInterface } from './attach.model';

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

export interface TokenDto {
  accessToken: string;
}

export interface AuthDto {
  login: string;
  password: string;
}
