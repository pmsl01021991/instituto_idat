import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  async login(email: string, password: string): Promise<{ ok: boolean, mensaje: string }> {
    try {

      // 1. Login Firebase Auth
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      const user: User = cred.user;

      // 2. Generar token
      const token = await user.getIdToken();

      // 3. Leer Firestore correctamente usando firstValueFrom
      const userRef = doc(this.firestore, `usuarios/${user.uid}`);
      const data: any = await firstValueFrom(docData(userRef));

      if (!data) {
        return { ok: false, mensaje: "El usuario no tiene rol asignado." };
      }

      // 4. Leer rol
      const rol = data.tipo;

      // 5. Guardar sesión
      localStorage.setItem("token", token);
      localStorage.setItem("role", rol);
      localStorage.setItem("correo", data.email);
      localStorage.setItem("nombre", data.nombre || "");

      return { ok: true, mensaje: rol };

    } catch (err) {
      console.error("ERROR LOGIN:", err);
      return { ok: false, mensaje: "Credenciales incorrectas ⚠️" };
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return !!localStorage.getItem("token");
  }

  getRol(): string | null {
    return localStorage.getItem("role");
  }
}
