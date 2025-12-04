import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private firestore: Firestore) {}

  // =====================================================
  // 🔥 1. Enviar reporte (Profesor o Estudiante)
  // =====================================================
  async guardarReporte(tipo: 'profesor' | 'estudiante', reporte: any) {
    try {
      const ref = collection(this.firestore, 'reportes');

      await addDoc(ref, {
        ...reporte,
        tipo,
        fecha: Timestamp.now() // fecha REAL ordenable
      });

      return { ok: true };

    } catch (error: any) {
      return { ok: false, mensaje: error.message };
    }
  }

  // =====================================================
  // 🔥 2. Obtener TODOS los reportes ordenados
  // =====================================================
  async obtenerReportes() {
    try {
      const ref = collection(this.firestore, 'reportes');
      const q = query(ref, orderBy("fecha", "desc"));
      const snapshot = await getDocs(q);

      const profesores: any[] = [];
      const estudiantes: any[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        // 👉 Conversión segura (acepta timestamp y string)
        const fechaReal = (data['fecha']?.toDate)
          ? data['fecha'].toDate().toLocaleString()
          : (typeof data['fecha'] === 'string' ? data['fecha'] : '');

        const reporte = {
          ...data,
          fecha: fechaReal
        };

        if (data['tipo'] === 'profesor') profesores.push(reporte);
        if (data['tipo'] === 'estudiante') estudiantes.push(reporte);
      });

      return { profesores, estudiantes };

    } catch (error) {
      console.error(error);
      return { profesores: [], estudiantes: [] };
    }
  }


}
