import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const RoleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const role = localStorage.getItem('role');
  const expected = route.data?.['role'];

  if (role === expected) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
