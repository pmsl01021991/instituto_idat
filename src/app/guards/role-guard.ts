import { CanActivateFn } from '@angular/router';

export const RoleGuard: CanActivateFn = (route, state) => {
  
  const role = localStorage.getItem('role');
  const expected = route.data?.['role'];

  return role === expected;
};
