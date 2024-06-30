import { createReducer, on } from '@ngrx/store';

import {
  initialState,
  thingAdapter,
  attachAdapter,
  AppState,
} from './app.state';
import * as AppActions from './app.actions';

import { MessageInterface } from '../models/message.model';

export const reducer = createReducer(
  initialState,

  /**
   * App reducers
   */

  // set Loading on Login
  on(AppActions.login, (state): AppState => {
    return {
      ...state,
      loading: true,
    };
  }),

  // set Data after it loaded from the back-end
  on(AppActions.loadSucess, (state, { attaches, things }) => {
    return {
      ...state,
      data: {
        things: thingAdapter.setAll(things, state.data.things),
        attaches: attachAdapter.setAll(attaches, state.data.attaches),
      },
    };
  }),

  // set Unauthhorized
  on(AppActions.setUnauthorized, (state): AppState => {
    return {
      ...state,
      authorized: false,
    };
  }),
  // set Authorizer
  on(AppActions.setAuthorized, (state): AppState => {
    return {
      ...state,
      authorized: true,
    };
  }),

  // add Message
  on(AppActions.messageAdd, (state, { message }): AppState => {
    return {
      ...state,
      messages: [...state.messages, message],
    };
  }),
  // clear Messages
  on(AppActions.messageClear, (state): AppState => {
    return {
      ...state,
      messages: [],
    };
  }),

  // set Selected thing
  on(AppActions.setSelected, (state, { selected }): AppState => {
    return {
      ...state,
      selected: selected,
    };
  }),

  /**
   * Data reducers
   */

  // add Attach
  on(AppActions.thingAttachSuccess, (state, { attach }) => {
    return {
      ...state,
      data: {
        attaches: !(state.data.attaches.ids as string[]).includes(attach.thing)
          ? attachAdapter.addOne(attach, state.data.attaches)
          : attachAdapter.updateOne(
              {
                id: attach.thing,
                changes: {
                  container: attach.container,
                },
              },
              state.data.attaches
            ),
        things: state.data.things,
      },
      selected: null,
    };
  }),

  // add Thing
  on(AppActions.thingCreateSuccess, (state, { thing }) => {
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          text: 'Thing created',
          type: 'success',
        } as MessageInterface,
      ],
      data: {
        things: thingAdapter.addOne(thing, state.data.things),
        attaches: state.data.attaches,
      },
    };
  }),

  // delete Thing
  on(AppActions.thingDeleteSuccess, (state, { thingId }) => {
    const things = Object.values(
      thingAdapter.removeOne(thingId, state.data.things).entities
    ) as [];
    const updated = thingAdapter.setAll(things, state.data.things);

    return {
      ...state,
      selected: null,
      data: {
        things: updated,
        attaches: state.data.attaches,
      },
    };
  })
);
