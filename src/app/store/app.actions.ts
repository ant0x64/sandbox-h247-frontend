import { createAction, props } from '@ngrx/store';

import { AppState } from './app.state';

import { ThingInterface } from '../models/thing.model';
import { AttachInterface } from '../models/attach.model';
import { MessageInterface } from '../models/message.model';
import { AuthDto, ThingDto } from '../models/api.dto';

export const enum ActionsList {
  LOAD = '[APP] Load',
  LOAD_SUCCESS = '[APP] Load Success',
  LOAD_FAILURE = '[APP] Load Failure',
  APP_SELECT = '[APP] Select Thing',

  MESSAGE_ADD = '[APP] Message Added',
  MESSAGE_CLEAR = '[APP] Message Clear',

  LOGOUT = '[APP] Logout',
  LOGIN = '[APP] Login',
  LOGIN_SUCCESS = '[APP] Login Success',
  UNAUTHORIZED = '[APP] Unauthorized',

  THING_ATTACH = '[Thing] Attach',
  THING_ATTACH_SUCCESS = '[Thing] Attach Success',

  THING_CREATE = '[Thing] Create',
  THING_CREATE_SUCCESS = '[Thing] Create Success',
  THING_DELETE = '[Thing] Delete',
  THING_DELETE_SUCCESS = '[Thing] Delete Success',
}

/**
 * [APP]
 */
export const load = createAction(ActionsList.LOAD);

export const loadSucess = createAction(
  ActionsList.LOAD_SUCCESS,
  props<{ things: ThingInterface[]; attaches: AttachInterface[] }>()
);

export const loadFailure = createAction(
  ActionsList.LOAD_FAILURE,
  props<{ error: unknown }>()
);

export const login = createAction(
  ActionsList.LOGIN,
  props<{ authDto: AuthDto }>()
);
export const logout = createAction(ActionsList.LOGOUT);
export const setAuthorized = createAction(ActionsList.LOGIN_SUCCESS);
export const setUnauthorized = createAction(ActionsList.UNAUTHORIZED);

export const setSelected = createAction(
  ActionsList.APP_SELECT,
  props<{ selected: AppState['selected'] }>()
);

export const messageAdd = createAction(
  ActionsList.MESSAGE_ADD,
  props<{ message: MessageInterface }>()
);

export const messageClear = createAction(ActionsList.MESSAGE_CLEAR);

/**
 * [Thing]
 */
export const thingAttach = createAction(
  ActionsList.THING_ATTACH,
  props<{
    element: AttachInterface['thing'];
    ref: AttachInterface['container'];
  }>()
);

export const thingCreate = createAction(
  ActionsList.THING_CREATE,
  props<{ thing: ThingDto }>()
);

export const thingDelete = createAction(
  ActionsList.THING_DELETE,
  props<{ thingId: ThingInterface['id'] }>()
);

export const thingAttachSuccess = createAction(
  ActionsList.THING_ATTACH_SUCCESS,
  props<{
    attach: AttachInterface;
  }>()
);

export const thingAttachedFailure = createAction(
  ActionsList.LOAD_FAILURE,
  props<{ error: unknown }>()
);

export const thingCreateSuccess = createAction(
  ActionsList.THING_CREATE_SUCCESS,
  props<{
    thing: ThingInterface;
  }>()
);

export const thingDeleteSuccess = createAction(
  ActionsList.THING_DELETE_SUCCESS,
  props<{ thingId: ThingInterface['id'] }>()
);
