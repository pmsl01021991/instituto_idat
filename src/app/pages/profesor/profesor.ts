import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { ToastService } from '../../services/toast.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'profesor-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profesor.html',
  styleUrls: ['./profesor.css']
})
export class Profesor {

  reporteTexto: string = "";
  alumnos: any[] = [];
  buscador = "";
  menuOpen = false;

  constructor(
    private router: Router,
    private reportesService: ReportesService,
    private toast: ToastService,
    private usuariosService: UsuariosService
  ) {

    // 🔥 Cargar ESTUDIANTES REALES desde Firestore
    this.usuariosService.obtenerEstudiantes().subscribe((lista) => {
      this.alumnos = lista;
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("correo");
    localStorage.removeItem("nombre");
    this.router.navigate(['/login']);
  }

  // 🔍 FILTRO DE BÚSQUEDA
  get alumnosFiltrados() {
    return this.alumnos.filter(a =>
      a.nombre.toLowerCase().includes(this.buscador.toLowerCase())
    );
  }

  async enviarReporte() {

    if (!this.reporteTexto.trim()) {
      this.toast.error("El reporte no puede estar vacío.");
      return;
    }

    const correo = localStorage.getItem("correo") || "correo_no_registrado";
    const nombre = localStorage.getItem("nombre") || "Profesor";

    const resultado = await this.reportesService.guardarReporte('profesor', {
      remitente: nombre,
      correo: correo,
      texto: this.reporteTexto,
      fecha: new Date().toLocaleString()
    });

    if (!resultado.ok) {
      this.toast.error("Error al enviar reporte: " + resultado.mensaje);
      return;
    }

    this.toast.success("Reporte enviado correctamente.");
    this.reporteTexto = "";
  }

  scrollToAlumnos() {
    document.getElementById('alumnosSection')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToReportes() {
    document.getElementById('reportesSection')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

}
