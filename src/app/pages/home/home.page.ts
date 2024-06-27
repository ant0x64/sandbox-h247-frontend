import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

import { FlatComponent } from 'src/app/components/flat/flat.component';
import { FormComponent } from 'src/app/components/form/form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FlatComponent,
    FormComponent,
  ],
})
export class HomePage {
  constructor() {}
}
