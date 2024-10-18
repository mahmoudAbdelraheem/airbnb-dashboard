import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthState().pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        console.log('Not logged in');
        router.navigate(['/login']);
      }
    }),
    map((isLoggedIn) => isLoggedIn)
  );
};
