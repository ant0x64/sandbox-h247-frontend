import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, map, exhaustMap, catchError } from 'rxjs';

import * as AppActions from './app.actions';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { AttachInterface } from '../models/attach.model';
import { ThingInterface } from '../models/thing.model';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppEffects {
  constructor(
    private actions$: Actions,

    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logout),
      map(() => {
        return AppActions.setUnauthorized();
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.login),
      exhaustMap(({ authDto }) => {
        return this.authService.auth(authDto).pipe(
          map(() => {
            return AppActions.setAuthorized();
          }),
          catchError((response) =>
            of(
              AppActions.messageAdd({
                message: {
                  text:
                    response.status === HttpStatusCode.Unauthorized
                      ? 'Wrong credentials'
                      : 'Auth failure',
                  type: 'error',
                },
              })
            )
          )
        );
      })
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.load),
      exhaustMap(() => {
        return this.apiService.load().pipe(
          map(({ attaches, things }) => {
            /** @todo Implement Dto Mapper */
            return AppActions.loadSucess({
              things: things as ThingInterface[],
              attaches: attaches as AttachInterface[],
            });
          }),
          catchError(() =>
            of(
              AppActions.messageAdd({
                message: { text: 'Loading failure', type: 'error' },
              })
            )
          )
        );
      })
    );
  });

  attach$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.thingAttach),
      exhaustMap(({ element, ref }) => {
        return this.apiService.attach(element, ref).pipe(
          map((attach) => {
            return AppActions.thingAttachSuccess({
              attach,
            });
          }),
          catchError(({ error }) =>
            of(
              AppActions.messageAdd({
                message: {
                  text: error.message || 'Attach failure',
                  type: 'error',
                },
              })
            )
          )
        );
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.thingCreate),
      exhaustMap(({ thing }) => {
        return this.apiService.create(thing).pipe(
          map((thing) => {
            return AppActions.thingCreateSuccess({
              thing: thing as ThingInterface,
            });
          }),
          catchError(({ error }) =>
            of(
              AppActions.messageAdd({
                message: {
                  text: error.message || 'Create failure',
                  type: 'error',
                },
              })
            )
          )
        );
      })
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.thingDelete),
      exhaustMap(({ thingId }) => {
        return this.apiService.delete(thingId).pipe(
          map(() => {
            return AppActions.thingDeleteSuccess({ thingId });
          }),
          catchError(({ error }) =>
            of(
              AppActions.messageAdd({
                message: {
                  text: error.message || 'Delete failure',
                  type: 'error',
                },
              })
            )
          )
        );
      })
    );
  });
}
