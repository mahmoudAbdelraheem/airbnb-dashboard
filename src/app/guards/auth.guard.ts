import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.getAuthState().pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        authService.router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
