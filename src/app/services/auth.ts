import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  // ============================================================
  // LOGIN GENERAL (ADMIN / PROFESOR / ESTUDIANTE)
  // ============================================================
  async login(email: string, password: string): Promise<{ ok: boolean, mensaje: string }> {
    try {

      // 🔥 LOGIN FIREBASE AUTH
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      const user: User = cred.user;

      // 🔥 JWT REAL DE FIREBASE
      const token = await user.getIdToken();

      // 🔥 OBTENER ROL DESDE FIRESTORE
      const userRef = doc(this.firestore, `usuarios/${user.uid}`);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        return { ok: false, mensaje: "El usuario no tiene rol asignado." };
      }

      const data: any = snap.data();
      const rol = data.tipo;

      // 🔥 GUARDAR TODO EN LOCALSTORAGE
      localStorage.setItem("token", token);
      localStorage.setItem("role", rol);
      localStorage.setItem("correo", email);
      localStorage.setItem("nombre", data.nombre || "");

      return { ok: true, mensaje: rol };

    } catch (err) {
      return { ok: false, mensaje: "Credenciales incorrectas ⚠️" };
    }
  }

  // ============================================================
  // LOGOUT
  // ============================================================
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ============================================================
  // SABER SI ESTÁ LOGUEADO
  // ============================================================
  isLogged(): boolean {
    return !!localStorage.getItem("token");
  }

  getRol(): string | null {
    return localStorage.getItem("role");
  }

}
