import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('token');

  return !!token; // Permitir si existe token
};
