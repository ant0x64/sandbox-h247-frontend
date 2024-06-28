import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { ThingInterface } from '../models/thing.model';
import { AttachInterface } from '../models/attach.model';
import { MessageInterface } from '../models/message.model';

export interface ThingsState extends EntityState<ThingInterface> {}
export interface AttachsState extends EntityState<AttachInterface> {}

export interface AppState {
  data: {
    things: ThingsState;
    attaches: AttachsState;
  };
  loading: boolean;
  selected: ThingInterface['id'] | null;
  messages: MessageInterface[]
}

export const thingAdapter = createEntityAdapter<ThingInterface>();
export const attachAdapter = createEntityAdapter<AttachInterface>({
  selectId: (attach) => attach.thing,
});

export const initialState: AppState = {
  data: {
    things: thingAdapter.getInitialState(),
    attaches: attachAdapter.getInitialState(),
  },
  loading: false,
  selected: null,
  messages: []
};
