import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginAdmin(code: string, pass: string): boolean {
    if (code === 'admin123' && pass === 'pmsl123') {
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('role', 'admin');
      return true;
    }
    return false;
  }

  loginUser(email: string, pass: string, tipo: string, guardados: any[]): boolean {

    const usuario = guardados.find(u =>
      u.email === email &&
      u.pass === pass &&
      u.tipo === tipo
    );

    if (usuario) {
      localStorage.setItem('token', 'user-token');
      localStorage.setItem('role', usuario.tipo);
      return true;
    }

    return false;
  }

  logout() {
    localStorage.clear();
  }
}
