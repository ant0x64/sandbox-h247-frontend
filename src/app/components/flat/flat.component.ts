import { Component } from '@angular/core';
import { NgForOf, AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { ThingInterface } from 'src/app/models/thing.model';

import { selectNotAttachedThings } from 'src/app/store/app.selector';
import { Observable } from 'rxjs';

import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

import { ThingComponent } from '../thing/thing.component';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    NgForOf,
    AsyncPipe,
    ThingComponent,
  ],
})
export class FlatComponent {
  protected elements$: Observable<ThingInterface[]>;

  constructor(private store: Store) {
    this.elements$ = this.store.select(selectNotAttachedThings);
  }
}
