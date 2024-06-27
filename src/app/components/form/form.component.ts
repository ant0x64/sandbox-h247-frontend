import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ThingInterface } from '../../models/thing.model';
import {
  IonApp,
  IonRouterOutlet,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonInput,
  IonItem,
  IonTitle,
  IonLabel,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { thingCreate } from 'src/app/store/app.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    IonList,
    NgIf,
    IonContent,
    IonLabel,
    IonTitle,
    IonItem,
    IonInput,
    IonContent,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonModal,
    IonButton,
    IonApp,
    IonRouterOutlet,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class FormComponent {
  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(private store: Store) {}

  data = {
    type: 'element',
  } as {
    size: ThingInterface['size'] | undefined;
    type: ThingInterface['type'] | undefined;
  };

  cancel() {
    this.modal?.dismiss();
    this.data.size = undefined;
  }
  submit() {
    // @todo add validation
    this.store.dispatch(
      thingCreate({
        thing: {
          size: this.data.size || 0,
          type: this.data.type || 'element',
        },
      })
    );
  }
}
