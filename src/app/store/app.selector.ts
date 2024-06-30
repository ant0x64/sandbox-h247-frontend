import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './app.state';
import { ThingInterface } from '../models/thing.model';
import { AttachInterface } from '../models/attach.model';

// APP

export const selectApp = createFeatureSelector<AppState>('app');

export const selectAppSelected = createSelector(
  selectApp,
  (app) => app.selected
);
export const selectMessages = createSelector(selectApp, (app) => app.messages);

export const selectIsAuth = createSelector(selectApp, (app) => app.authorized);

// DATA THING and ATTACHES

export const selectThings = createSelector(selectApp, (app) =>
  app.data
    ? // I don't know why if the type is not specified, return type may be undefined[]
      (Object.values(app.data.things.entities) as ThingInterface[])
    : []
);
export const selectAttaches = createSelector(selectApp, (app) =>
  app.data
    ? (Object.values(app.data.attaches.entities) as AttachInterface[])
    : []
);

// DATA FILTERED

export const selectNotAttachedThings = createSelector(
  selectThings,
  selectAttaches,
  (things, attaches) => {
    const filterIds: AttachInterface['thing'][] = [];

    attaches.reduce((result, item) => {
      if (
        item.container !== null &&
        things.find((t) => t.id === item.container)
      ) {
        result.push(item.thing);
      }
      return result;
    }, filterIds);

    return things.filter((thing) => !filterIds.includes(thing.id));
  }
);

export const selectAttachedThings = (container: AttachInterface['container']) =>
  createSelector(selectThings, selectAttaches, (things, attaches) => {
    const ids: AttachInterface['thing'][] = [];

    attaches.reduce((prev, item) => {
      if (item.container === container) {
        prev.push(item.thing);
      }
      return prev;
    }, ids);

    return things.filter((thing) => ids.includes(thing.id));
  });
