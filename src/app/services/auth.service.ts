import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { AuthDto, TokenDto } from '../models/api.dto';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private key = 'access_token';

  private api_url = environment.api_url;
  private storage = localStorage;

  constructor(private http: HttpClient) {}

  auth(authDto: AuthDto) {
    return this.http.post<TokenDto>(`${this.api_url}/auth`, authDto).pipe(
      tap((tokenDto) => {
        this.saveToken(tokenDto);
      })
    );
  }

  saveToken({ accessToken }: TokenDto) {
    this.storage.setItem(this.key, accessToken);
  }

  getToken(): TokenDto['accessToken'] | null {
    return this.storage.getItem(this.key);
  }

  clearToken(): void {
    this.storage.removeItem(this.key);
  }
}
