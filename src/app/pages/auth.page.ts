import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { login } from '../store/app.actions';

import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
  ],
})
export class AuthPage {
  data = {} as {
    login: string;
    password: string;
  };

  constructor(private store: Store) {}

  authorize() {
    this.store.dispatch(
      login({
        authDto: {
          login: this.data.login,
          password: this.data.password,
        },
      })
    );
  }
}
