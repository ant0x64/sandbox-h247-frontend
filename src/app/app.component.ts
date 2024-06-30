import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { selectIsAuth, selectMessages } from './store/app.selector';
import { messageClear, setAuthorized } from './store/app.actions';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.initMessageController();
    this.initAuthController();
  }

  protected initAuthController() {
    this.store
      .select(selectIsAuth)
      .pipe()
      .subscribe((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth']);
        } else {
          this.router.navigate(['/']);
        }
      });

    if (this.authService.getToken()) {
      this.store.dispatch(setAuthorized());
    }
  }

  protected initMessageController() {
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
        /** @todo: Implement queue */
        this.store.dispatch(messageClear());
      });
  }
}
