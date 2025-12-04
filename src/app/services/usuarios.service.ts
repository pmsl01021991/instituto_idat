import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Auth, createUserWithEmailAndPassword, deleteUser } from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  collectionData 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // =======================================================
  //  CREAR USUARIO EN AUTH + FIRESTORE
  // =======================================================
  async crearUsuario(nombre: string, email: string, pass: string, tipo: string) {
    try {
      // 1. Crear usuario en Authentication
      const cred = await createUserWithEmailAndPassword(this.auth, email, pass);
      const uid = cred.user.uid;

      // 2. Guardar datos en Firestore
      await setDoc(doc(this.firestore, `usuarios/${uid}`), {
        uid,
        nombre,
        email,
        tipo
      });

      return { ok: true };
    } catch (error: any) {
      return { ok: false, mensaje: error.message };
    }
  }

  // =======================================================
  //  OBTENER TODOS LOS USUARIOS (real-time)
  // =======================================================
  obtenerUsuarios(): Observable<any[]> {
    const coleccion = collection(this.firestore, 'usuarios');
    return collectionData(coleccion, { idField: 'uid' }) as Observable<any[]>;
  }

  obtenerEstudiantes() {
    const ref = collection(this.firestore, 'usuarios');
    return collectionData(ref, { idField: 'uid' }).pipe(
        map((usuarios: any[]) => usuarios.filter(u => u.tipo === 'estudiante'))
    );
    }


  // =======================================================
  //  ACTUALIZAR USUARIO EN FIRESTORE
  // =======================================================
  async actualizarUsuario(uid: string, data: any) {
    try {
      const ref = doc(this.firestore, `usuarios/${uid}`);
      await updateDoc(ref, data);
      return { ok: true };
    } catch (error: any) {
      return { ok: false, mensaje: error.message };
    }
  }

  // =======================================================
  //  ELIMINAR USUARIO (Firestore + opcional Auth)
  // =======================================================
  async eliminarUsuario(uid: string) {
    try {
      // 1. Borrar Firestore
      await deleteDoc(doc(this.firestore, `usuarios/${uid}`));

      // 2. (OPCIONAL) Borrar también de Authentication
      // ⚠️ Solo si el usuario actual tiene permisos
      // const user = await this.auth.getUser(uid);
      // await deleteUser(user);

      return { ok: true };
    } catch (error: any) {
      return { ok: false, mensaje: error.message };
    }
  }
}
