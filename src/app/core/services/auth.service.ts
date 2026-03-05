// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { LoginRequest, RegisterRequest, TokenResponse } from './auth.interfaces';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl+"/auth"; // cambia según tu backend
  private accessKey = 'access_token';
  private refreshKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/register`, request)
      .pipe(
        tap(res => this.storeTokens(res))
      );
  }

  // 🔹 Login
  login(request: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, request)
      .pipe(
        tap(res => this.storeTokens(res))
      );
  }

  refreshToken(): Observable<TokenResponse> {
       return this.http.post<TokenResponse>(`${this.baseUrl}/refresh`, null)
      .pipe(
        tap(res => this.storeTokens(res))
      );
  }

  logout(): Observable<any> {
    const accessToken = this.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    return this.http.post<any>(`${this.baseUrl}/logout`, null, { headers })
      .pipe(
        tap(() => this.clearTokens())
      );
  }

  // 🔹 Guardar tokens
   private storeTokens(tokens: TokenResponse) {
    localStorage.setItem(this.accessKey, tokens.access_token);
    localStorage.setItem(this.refreshKey, tokens.refresh_token);
    console.log('Tokens almacenados:', tokens);
  }

  // 🔹 Obtener tokens
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  // 🔹 Limpiar tokens
  private clearTokens() {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }

  // 🔹 Usuario logueado
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}