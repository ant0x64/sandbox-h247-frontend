import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { setSelected, thingAttach } from 'src/app/store/app.actions';
import {
  selectAppSelected,
  selectAttachedThings,
} from 'src/app/store/app.selector';

import { Observable, take } from 'rxjs';

import { ThingInterface } from 'src/app/models/thing.model';

import { NgClass, NgIf, NgFor, AsyncPipe } from '@angular/common';

import {
  IonItem,
  IonList,
  IonContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonCard,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrl: './thing.component.scss',
  standalone: true,
  imports: [
    IonCard,
    IonText,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonContent,
    IonList,
    IonItem,
    AsyncPipe,
    NgFor,
    NgIf,
    NgClass,
  ],
})
export class ThingComponent implements OnInit {
  @Input() data: ThingInterface = {
    id: '',
    size: 0,
    type: 'container',
  }; // to avoid checking on undefined

  protected freeSize: ThingInterface['size'] = 0;

  protected selected$: Observable<ThingInterface['id'] | null>;
  protected childrens$: Observable<ThingInterface[]>;

  constructor(private store: Store) {
    this.selected$ = this.store.select(selectAppSelected);
    this.childrens$ = this.store.select(selectAttachedThings(this.data.id));
  }

  ngOnInit(): void {
    this.childrens$ = this.store.select(selectAttachedThings(this.data.id)); // input data is undefined in constructor ...
    
    // Calculate Thing free space
    this.childrens$.pipe().subscribe((childs) => {
      let free = this.data.size;
      childs.forEach((child) => {
        free -= child.size;
      });
      this.freeSize = free;
    });
  }

  click() {
    this.selected$.pipe(take(1)).subscribe((selected) => {
      if (selected) {
        // App has selected, then try to attach
        if (selected === this.data.id) {
          this.store.dispatch(setSelected({ selected: null }));
        } else {
          this.store.dispatch(
            thingAttach({ element: selected, ref: this.data.id })
          );
        }
      } else {
        // Otherwise set selected
        /** @todo implement front-end validation as well */
        this.store.dispatch(setSelected({ selected: this.data.id }));
      }
    });
  }
}
