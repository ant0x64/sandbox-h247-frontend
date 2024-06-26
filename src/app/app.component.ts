import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { load, messageClear } from './store/app.actions';
import { selectMessages } from './store/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
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
  ngOnInit() {
    this.store.dispatch(load());
  }
}
