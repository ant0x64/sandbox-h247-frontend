import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

import { FlatComponent } from 'src/app/components/flat/flat.component';
import { FormComponent } from 'src/app/components/form/form.component';

import { load } from '../store/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    FlatComponent,
    FormComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(load());
  }
}
