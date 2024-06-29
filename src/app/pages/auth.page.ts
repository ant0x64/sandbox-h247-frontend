import { Component } from '@angular/core';
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
import { Store } from '@ngrx/store';

import { FlatComponent } from 'src/app/components/flat/flat.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { login } from '../store/app.actions';

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
