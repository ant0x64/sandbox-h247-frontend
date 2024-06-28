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

  // APP

  on(AppActions.loadSucess, (state, { attaches, things }) => {
    return {
      ...state,
      data: {
        things: thingAdapter.setAll(things, state.data.things),
        attaches: attachAdapter.setAll(attaches, state.data.attaches),
      },
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
  }),

  // THING

  on(AppActions.thingAttachedSuccess, (state, { attach }) => {
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

  on(AppActions.thingSelect, (state, { selected }): AppState => {
    return {
      ...state,
      selected: selected,
    };
  }),

  on(AppActions.thingCreatedSuccess, (state, { thing }) => {
    return {
      ...state,
      data: {
        things: thingAdapter.addOne(thing, state.data.things),
        attaches: state.data.attaches,
      },
    };
  }),

  on(AppActions.thingDeletedSuccess, (state, { thingId }) => {
    const things = Object.values(
      thingAdapter.removeOne(thingId, state.data.things).entities
    ) as [];
    // @todo update only children
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
