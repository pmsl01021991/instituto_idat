import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Usuarios } from './components/usuarios/usuarios';
import { Cursos } from './components/cursos/cursos';

import { Admin } from './pages/admin/admin';
import { Profesor } from './pages/profesor/profesor';
import { Estudiante } from './pages/estudiante/estudiante';

import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },


  {
    path: 'usuarios',
    component: Usuarios,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'reportes',
    loadComponent: () => import('./reportes/reportes').then(m => m.Reportes),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },


  { path: 'cursos', component: Cursos, canActivate: [AuthGuard] },

  // 🔥 ESTAS SON LAS IMPORTANTES
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'profesor',
    component: Profesor,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'profesor' }
  },
  {
    path: 'estudiante',
    component: Estudiante,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'estudiante' }
  },

  { path: '**', redirectTo: 'login' }
];
