export interface ThingDto {
  id?: string,
  size: number,
  type: 'element' | 'container';
}

export interface AttachDto {
  thingId: string,
  containerId: string | null;
}

export interface LoadDto {
  things: ThingDto[],
  attaches: AttachDto[],
}
