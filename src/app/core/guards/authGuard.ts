import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAccessToken();
  const tokenRefresh = authService.getRefreshToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
   if (!tokenRefresh) {
    router.navigate(['/login']);
    return false;
  }

//   if (authService.isTokenExpired()) {
//     authService.logout();
//     router.navigate(['/login']);
//     return false;
//   }

  return true;
};