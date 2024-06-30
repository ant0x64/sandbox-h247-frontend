import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { thingCreate } from 'src/app/store/app.actions';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonInput,
  IonItem,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/angular/standalone';

import { ThingInterface } from 'src/app/models/thing.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    NgIf,
    IonList,
    IonContent,
    IonTitle,
    IonItem,
    IonInput,
    IonContent,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonModal,
    IonButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class FormComponent implements OnDestroy {
  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(private store: Store) {}

  data = {
    type: 'element', // default type
  } as {
    size: ThingInterface['size'] | undefined;
    type: ThingInterface['type'] | undefined;
  };

  cancel() {
    this.modal?.dismiss();

    // Reset size input
    this.data.size = undefined;
  }
  submit() {
    this.store.dispatch(
      thingCreate({
        thing: {
          size: this.data.size || 0,
          type: this.data.type || 'element',
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.modal?.dismiss();
  }
}
