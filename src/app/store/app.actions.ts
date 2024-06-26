import { createAction, props } from '@ngrx/store';

import { ThingInterface } from '../models/thing.model';
import { AttachInterface } from '../models/attach.model';
import { AppState } from './app.state';

export const enum ActionsList {
  LOAD = '[EFFECT] Load',
  LOAD_SUCCESS = '[EFFECT] Load Success',
  LOAD_FAILURE = '[NOT IMPLEMENTED] Load Failure',

  THING_ATTACH = '[EFFECT] Thing Attach',

  THING_SELECT = '[VIEW] Thing Select',
  THING_CREATED = '[VIEW] Thing Create',

  ATTACH_SUCCESS = '[API] Attach Success',

  MESSAGE_ADD = '[API] Message Added',
  MESSAGE_CLEAR = '[API] Message Clear',
}

// VIEW

export const load = createAction(ActionsList.LOAD);

// @see thingAttachedSuccess | thingAttachedFailure
export const thingTryAttach = createAction(
  ActionsList.THING_ATTACH,
  props<{
    element: AttachInterface['thingId'];
    ref: AttachInterface['containerId'];
  }>()
);

export const thingSelect = createAction(
  ActionsList.THING_SELECT,
  props<{ selected: AppState['selected'] }>()
);

// API

export const loadSucess = createAction(
  ActionsList.LOAD_SUCCESS,
  props<{ things: ThingInterface[]; attaches: AttachInterface[] }>()
);

export const loadFailure = createAction(
  ActionsList.LOAD_FAILURE,
  props<{ error: any }>()
);

export const thingAttachedSuccess = createAction(
  ActionsList.ATTACH_SUCCESS,
  props<{
    attach: AttachInterface;
  }>()
);

export const thingAttachedFailure = createAction(
  ActionsList.LOAD_FAILURE,
  props<{ error: any }>()
);

type ElementOf<T> = T extends Array<infer U> ? U : never;

export const messageAdd = createAction(
  ActionsList.MESSAGE_ADD,
  props<{ message: ElementOf<AppState['messages']> }>()
);

export const messageClear = createAction(ActionsList.MESSAGE_CLEAR);
