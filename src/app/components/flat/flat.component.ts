import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { thingDelete } from 'src/app/store/app.actions';
import {
  selectAppSelected,
  selectNotAttachedThings,
} from 'src/app/store/app.selector';

import { Observable } from 'rxjs';

import { NgForOf, AsyncPipe, NgIf, NgClass } from '@angular/common';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { ThingComponent } from '../thing/thing.component';

import { ThingInterface } from 'src/app/models/thing.model';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrl: './flat.component.scss',
  standalone: true,
  imports: [
    ThingComponent,

    NgForOf,
    NgIf,
    NgClass,
    AsyncPipe,

    IonFabButton,
    IonFab,
    IonIcon,
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
