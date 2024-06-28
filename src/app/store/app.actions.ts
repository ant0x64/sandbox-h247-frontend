import { createAction, props } from '@ngrx/store';

import { ThingInterface } from '../models/thing.model';
import { AttachInterface } from '../models/attach.model';
import { AppState } from './app.state';
import { ThingDto } from '../services/api.dto';

export const enum ActionsList {
  LOAD = '[EFFECT] Load',
  LOAD_SUCCESS = '[EFFECT] Load Success',
  LOAD_FAILURE = '[NOT IMPLEMENTED] Load Failure',

  THING_ATTACH = '[EFFECT] Thing Attach',
  ATTACH_SUCCESS = '[API] Attach Success',

  THING_SELECT = '[VIEW] Thing Select',
  THING_CREATE = '[VIEW] Thing Create',
  THING_CREATED_SUCCESS = '[API] Thing Created Success',
  THING_DELETE = '[VIEW] Thing Delete',
  DELETE_SUCCESS = '[VIEW] Delete Success',

  MESSAGE_ADD = '[API] Message Added',
  MESSAGE_CLEAR = '[API] Message Clear',
}

// VIEW

export const load = createAction(ActionsList.LOAD);

// @see thingAttachedSuccess | thingAttachedFailure
export const thingAttach = createAction(
  ActionsList.THING_ATTACH,
  props<{
    element: AttachInterface['thing'];
    ref: AttachInterface['container'];
  }>()
);

export const thingSelect = createAction(
  ActionsList.THING_SELECT,
  props<{ selected: AppState['selected'] }>()
);

export const thingCreate = createAction(
  ActionsList.THING_CREATE,
  props<{ thing: ThingDto }>()
);

export const thingDelete = createAction(
  ActionsList.THING_DELETE,
  props<{ thingId: ThingInterface['id'] }>()
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

export const thingCreatedSuccess = createAction(
  ActionsList.THING_CREATED_SUCCESS,
  props<{
    thing: ThingInterface;
  }>()
);

export const thingDeletedSuccess = createAction(
  ActionsList.DELETE_SUCCESS,
  props<{ thingId: ThingInterface['id'] }>()
);

type ElementOf<T> = T extends Array<infer U> ? U : never;

export const messageAdd = createAction(
  ActionsList.MESSAGE_ADD,
  props<{ message: ElementOf<AppState['messages']> }>()
);

export const messageClear = createAction(ActionsList.MESSAGE_CLEAR);
