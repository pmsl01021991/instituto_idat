import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private KEY = 'reportesSistema';

  constructor() {
    this.inicializarEstructura();
  }

  // 🔥 Asegura que SIEMPRE existan profesores y estudiantes
  private inicializarEstructura() {
    const data = localStorage.getItem(this.KEY);

    if (!data) {
      localStorage.setItem(this.KEY, JSON.stringify({
        profesores: [],
        estudiantes: []
      }));
      return;
    }

    const parsed = JSON.parse(data);

    // Si falta algo, lo agregamos
    if (!parsed.profesores) parsed.profesores = [];
    if (!parsed.estudiantes) parsed.estudiantes = [];

    // Reguardar todo corregido
    localStorage.setItem(this.KEY, JSON.stringify(parsed));
  }

  obtenerReportes() {
    this.inicializarEstructura();
    return JSON.parse(localStorage.getItem(this.KEY)!);
  }

  guardarReporte(tipo: 'profesor' | 'estudiante', reporte: any) {

    this.inicializarEstructura();

    const data = JSON.parse(localStorage.getItem(this.KEY)!);

    // Evita bug del tipo + 'es'
    const key = tipo === 'profesor' ? 'profesores' : 'estudiantes';

    if (!Array.isArray(data[key])) {
      data[key] = [];
    }

    data[key].push(reporte);

    localStorage.setItem(this.KEY, JSON.stringify(data));
  }
}
