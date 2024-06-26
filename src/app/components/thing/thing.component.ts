import { Component, Input, OnInit } from '@angular/core';
import { ThingInterface } from 'src/app/models/thing.model';

import { NgClass, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectAppSelected,
  selectAttachedThings,
} from 'src/app/store/app.selector';
import { Observable, take } from 'rxjs';
import { IonItem, IonList, IonContent } from '@ionic/angular/standalone';
import { thingSelect, thingTryAttach } from 'src/app/store/app.actions';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrl: './thing.component.scss',
  standalone: true,
  imports: [IonContent, IonList, IonItem, AsyncPipe, NgFor, NgIf, NgClass],
})
export class ThingComponent implements OnInit {
  @Input() data: ThingInterface = {
    id: '',
    size: 0,
    type: 'container',
  }; // to avoid checking on undefined

  protected selected$: Observable<ThingInterface['id'] | null>;
  protected elements$: Observable<ThingInterface[]>;

  constructor(private store: Store) {
    this.elements$ = this.store.select(selectAttachedThings(this.data.id));
    this.selected$ = this.store.select(selectAppSelected); // select(selectSelected) :)
  }

  // input data is undefined in constructor ...
  ngOnInit(): void {
    this.elements$ = this.store.select(selectAttachedThings(this.data.id));
  }

  click() {
    this.selected$.pipe(take(1)).subscribe((selected) => {
      if (selected) {
        if (selected === this.data.id) {
          this.store.dispatch(thingSelect({ selected: null }));
        } else {
          this.store.dispatch(
            thingTryAttach({ element: selected, ref: this.data.id })
          );
        }
      } else {
        this.store.dispatch(thingSelect({ selected: this.data.id }));
      }
    });
  }
}
