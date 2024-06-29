import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { LoadDto, ThingDto, AttachDto } from '../models/api.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  private api_url = environment.api_url;

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<LoadDto>(`${this.api_url}/load`);
  }

  create(thing: Omit<ThingDto, 'id'>) {
    return this.http.post(`${this.api_url}/create`, thing) as Observable<ThingDto>;
  }

  delete(id: ThingDto['id']) {
    return this.http.delete(`${this.api_url}/delete/${id}`);
  }

  attach(
    element: AttachDto['thing'],
    ref: AttachDto['container']
  ): Observable<AttachDto> {
    return this.http.post(`${this.api_url}/attach`, {
      thing: element,
      container: ref,
    }).pipe((res) => {
      return res as Observable<AttachDto>;
    });
  }
}
