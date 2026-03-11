import { ToastService, ToastType } from './../../shared/services/toast-msg.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const mensaje = error?.error?.servererror || '';
        const authErrors = [401, 402, 403];
        const currentUrl = this.router.url;
        if(error.status == 403){
          this.toastService.show(ToastType.Warning, "No tienes permiso para realizar esta accion");
          return throwError(() => error);
        }

        if (authErrors.includes(error.status)) {
          switch (mensaje) {
            case 'token_expired':
              // Refrescar token y reintentar la petición
              return from(this.authService.refreshToken()).pipe(
                switchMap((res: any) => {
                  const updatedReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${res.access_token}` }
                  });

                  if (currentUrl === '/taskmanager') {
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate([currentUrl]);
                    });
                  }
                   this.toastService.show(ToastType.Warning, "Session Expired, please login again");

                  return next.handle(updatedReq);
                }),
                catchError((err) => {
                  this.router.navigate(['/login']);
                  return throwError(() => err);
                })
              );
            case 'auth_error':
               this.toastService.show(ToastType.Error, "Authentication Error");
             return throwError(() => error);
            case 'invalid_token':
              this.router.navigate(['/login']);
              return throwError(() => error);

            default:
               this.toastService.show(ToastType.Error, "Internal Error");
              this.router.navigate(['/login']);
              return throwError(() => error);
          }
        }

        return throwError(() => error);
      })
    );
  }
}

