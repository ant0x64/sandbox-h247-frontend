import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import { logout } from './store/app.actions';

import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    let handledRequest = req;

    // If the request is to the API, then attach the token
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
        // If the response has 401 status, then dispatch logout
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
