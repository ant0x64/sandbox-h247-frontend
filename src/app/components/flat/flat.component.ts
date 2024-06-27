import { Component } from '@angular/core';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';

import { Store } from '@ngrx/store';
import { ThingInterface } from 'src/app/models/thing.model';

import {
  selectAppSelected,
  selectNotAttachedThings,
} from 'src/app/store/app.selector';
import { Observable } from 'rxjs';

import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons'; // Import this
import { trashOutline } from 'ionicons/icons';

import { ThingComponent } from '../thing/thing.component';
import { thingDelete } from 'src/app/store/app.actions';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrl: './flat.component.scss',
  standalone: true,
  imports: [
    IonIcon,
    IonFabButton,
    IonFab,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    NgForOf,
    NgIf,
    AsyncPipe,
    ThingComponent,
  ],
})
export class FlatComponent {
  protected elements$: Observable<ThingInterface[]>;
  protected selected$: Observable<ThingInterface['id'] | null>;

  constructor(private store: Store) {
    this.elements$ = this.store.select(selectNotAttachedThings);
    this.selected$ = this.store.select(selectAppSelected);
    addIcons({ trashOutline });
  }

  deleteAction(thingId: ThingInterface['id']) {
    this.store.dispatch(thingDelete({ thingId }));
  }
}
