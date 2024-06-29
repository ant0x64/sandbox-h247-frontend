import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { messageClear } from './store/app.actions';
import { selectMessages } from './store/app.selector';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  constructor(private store: Store, private alertController: AlertController) {
    // @todo put into the service
    this.store
      .select(selectMessages)
      .pipe()
      .subscribe((messages) => {
        if (!messages.length) {
          return;
        }
        messages.forEach(async (m) => {
          const alert = await this.alertController.create({
            message: m.text,
            header: m.type,
            buttons: [{ text: 'ok', role: 'cancel' }],
          });
          await alert.present();
        });
        // @todo queue on closed
        this.store.dispatch(messageClear());
      });
  }
}
