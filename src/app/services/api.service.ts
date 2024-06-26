import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { LoadDto, ThingDto, AttachDto } from './api.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  private api_url = environment.api_url;

  constructor(private http: HttpClient) {}

  load() {
    return new Observable<LoadDto>((_) => {
      // mock
      _.next({
        things: [
          { id: '1', size: 50, type: 'container' },
          { id: '2', size: 10, type: 'element' },
          { id: '3', size: 10, type: 'element' },
          { id: '4', size: 40, type: 'element' },
        ],
        attaches: [
          { thingId: '3', containerId: '1' },
          { thingId: '2', containerId: '1' },
          { thingId: '4', containerId: null },
        ],
      });
      _.complete();
    });
    //return this.http.get<LoadDto>(`${this.api_url}/load`);
  }

  create(thing: Omit<ThingDto, 'id'>) {
    return this.http.post(`${this.api_url}/thing`, thing);
  }

  delete(thing: ThingDto) {
    return this.http.delete(`${this.api_url}/thing`);
  }

  attach(
    element: AttachDto['thingId'],
    ref: AttachDto['containerId']
  ): Observable<AttachDto> {
    return new Observable<AttachDto>((_) => {
            _.error('Any error');
      _.complete();
      _.next({
        thingId: element,
        containerId: ref,
      });
      _.complete();
    });
    // return this.http.post(`${this.api_url}/attach`, {
    //   thingId: element,
    //   containerId: ref,
    // }).pipe((res) => {
    //   return res as Observable<AttachDto>;
    // });
  }
}
