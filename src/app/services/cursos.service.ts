import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CursosService {

  constructor(private firestore: Firestore) {}

  // ➤ Obtener todos los cursos
  async obtenerCursos() {
    const ref = collection(this.firestore, 'cursos');
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // ➤ Crear curso
  async crearCurso(data: any) {
    const ref = collection(this.firestore, 'cursos');
    await addDoc(ref, data);
  }

  // ➤ Editar curso
  async actualizarCurso(id: string, data: any) {
    const ref = doc(this.firestore, `cursos/${id}`);
    await updateDoc(ref, data);
  }

  // ➤ Eliminar curso
  async eliminarCurso(id: string) {
    const ref = doc(this.firestore, `cursos/${id}`);
    await deleteDoc(ref);
  }
}
