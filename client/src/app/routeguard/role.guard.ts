import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService)
  const router = inject(Router);

    if (!authService.isAdmin) {
    return router.createUrlTree(['/login']);
  } else {
    return true;
  }
};
