import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { selectIsAuth } from './store/app.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate() {
    return this.store.select(selectIsAuth).pipe(
      take(1),
      tap((isAuth) => isAuth)
    );
  }
}
