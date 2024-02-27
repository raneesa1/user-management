import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { AuthServiceService } from '../service/auth-service.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService)
  const router = inject(Router);

    if (!authService.isUser) {
    return router.createUrlTree(['/login']);
  } else {
    return true;
  }
};
