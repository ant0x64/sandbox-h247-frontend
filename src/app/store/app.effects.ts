import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, finalize } from 'rxjs/operators';

import ApiService from '../services/api.service';
import { AttachInterface } from '../models/attach.model';
import { ThingInterface } from '../models/thing.model';

import * as AppActions from './app.actions';
import { Router } from '@angular/router';
import AuthService from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logout),
      map(() => {
        this.router.navigate(['/auth']);
        return AppActions.unauthorized();
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.login),
      exhaustMap(({ authDto }) => {
        return this.authService.auth(authDto).pipe(
          map(() => {
            this.router.navigate(['/']);
            return AppActions.loginSuccess();
          }),
          catchError((response) =>
            of(
              AppActions.messageAdd({
                message: {
                  text:
                    response.status === 401
                      ? 'Wrong credentials'
                      : 'Auth failure',
                  type: 'error',
                },
              })
            )
          ),
        );
      })
    );
  });

  // LOAD
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.load),
      exhaustMap(() => {
        return this.apiService.load().pipe(
          map(({ attaches, things }) => {
            // @todo map dto to model
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
          ),
        );
      })
    );
  });

  // ATTACH
  attach$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.thingAttach),
      exhaustMap(({ element, ref }) => {
        return this.apiService.attach(element, ref).pipe(
          map((attach) => {
            return AppActions.thingAttachedSuccess({
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
          ),
        );
      })
    );
  });

  // CREATE
  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.thingCreate),
      exhaustMap(({ thing }) => {
        return this.apiService.create(thing).pipe(
          map((thing) => {
            return AppActions.thingCreatedSuccess({
              // @todo map dto to model
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
          ),
        );
      })
    );
  });

  // DELETE
  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.thingDelete),
      exhaustMap(({ thingId }) => {
        return this.apiService.delete(thingId).pipe(
          map(() => {
            return AppActions.thingDeletedSuccess({ thingId });
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
          ),
        );
      })
    );
  });
}
