import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import AuthService from './services/auth.service';
import { catchError, of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from './store/app.actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let handledRequest = req;

    if (req.url.indexOf(environment.api_url) !== -1) {
      const token = this.authService.getToken();
      if (token) {
        handledRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }
    }

    return next.handle(handledRequest).pipe(
      catchError((event) => {
        if (event.status === HttpStatusCode.Unauthorized) {
          this.store.dispatch(logout());
          this.authService.clearToken();
        }
        return throwError(() => {
          throw event;
        });
      })
    );
  }
}
