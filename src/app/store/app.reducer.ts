import { createReducer, on } from '@ngrx/store';

import {
  initialState,
  thingAdapter,
  attachAdapter,
  AppState,
} from './app.state';
import * as AppActions from './app.actions';

export const reducer = createReducer(
  initialState,

  on(AppActions.loadSucess, (state, { attaches, things }) => {
    return {
      ...state,
      data: {
        things: thingAdapter.setAll(things, state.data.things),
        attaches: attachAdapter.setAll(attaches, state.data.attaches),
      },
    };
  }),

  on(AppActions.thingAttachedSuccess, (state, { attach }) => {
    return {
      ...state,
      data: {
        attaches: attachAdapter.updateOne(
          {
            id: attach.thingId,
            changes: {
              containerId: attach.containerId,
            },
          },
          state.data.attaches
        ),
        things: state.data.things,
      },
      selected: null,
    };
  }),

  on(AppActions.thingSelect, (state, { selected }): AppState => {
    return {
      ...state,
      selected: selected,
    };
  }),

  on(AppActions.messageAdd, (state, { message }): AppState => {
    return {
      ...state,
      messages: [...state.messages, message],
    };
  }),

  on(AppActions.messageClear, (state): AppState => {
    return {
      ...state,
      messages: [],
    };
  })
);
