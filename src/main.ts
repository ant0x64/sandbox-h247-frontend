import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// INTERCEPTOR

import { AuthInterceptor } from './app/auth.interceptor';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// STORE
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { reducer } from './app/store/app.reducer';
import { AppEffects } from './app/store/app.effects';

// ROUTER
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';

import { routes } from './app/app.routes';

// VIEW
import {
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    provideStore(),
    provideState('app', reducer),
    provideEffects(AppEffects),

    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideIonicAngular(),
  ],
}).catch((err) => console.error(err));
