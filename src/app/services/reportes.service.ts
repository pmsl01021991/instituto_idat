import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private KEY = 'reportesSistema';

  constructor() {
    // inicializamos si no existe
    const data = localStorage.getItem(this.KEY);
    if (!data) {
      localStorage.setItem(this.KEY, JSON.stringify({ profesores: [], estudiantes: [] }));
    }
  }

  obtenerReportes() {
    return JSON.parse(localStorage.getItem(this.KEY)!);
  }

  guardarReporte(tipo: 'profesor' | 'estudiante', reporte: any) {
    const data = this.obtenerReportes();
    data[tipo + 'es'].push(reporte);
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }
}
