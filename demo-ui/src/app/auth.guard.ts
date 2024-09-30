import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(AuthService);
  const router = inject(Router);
  if (tokenService.keyClock.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }
  // router.navigate(['/dashboard']);
  return true;
};
