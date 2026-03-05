// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    const token =
     (url ===`${environment.apiUrl}/auth/refresh`) ? this.authService.getRefreshToken() : this.authService.getAccessToken();
    console.log('Token:', url, token);
    if (
      url === `${environment.apiUrl}/auth/register` ||
      url === `${environment.apiUrl}/auth/login`
    ) {
      return next.handle(req);
    }
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
