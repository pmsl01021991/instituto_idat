import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { ToastService } from '../../services/toast.service';


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

  editIndex: number | null = null;
  alumnoEditado = { nombre: "", correo: "" };

  constructor(private router: Router, private reportesService: ReportesService, private toast: ToastService) {
    const data = localStorage.getItem("alumnosSistema");
    if (data) this.alumnos = JSON.parse(data);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['/login']);
  }

  // FILTRO DE BÚSQUEDA
  get alumnosFiltrados() {
    return this.alumnos.filter(a =>
      a.nombre.toLowerCase().includes(this.buscador.toLowerCase()) 
    );
  }

  guardarLocal() {
    localStorage.setItem("alumnosSistema", JSON.stringify(this.alumnos));
  }

  // EDITAR ALUMNO
  editarAlumno(i: number) {
    this.editIndex = i;
    this.alumnoEditado = { ...this.alumnos[i] };
  }

  // GUARDAR CAMBIOS (solo el nombre)
  guardarAlumno(i: number) {
    const { nombre } = this.alumnoEditado;

    if (!nombre)
      return alert("El nombre no puede estar vacío.");

    // Solo actualiza el nombre — el correo nunca se edita aquí
    this.alumnos[i].nombre = nombre;

    this.editIndex = null;
    this.guardarLocal();
  }

  // ELIMINAR
  eliminarAlumno(i: number) {
    this.alumnos.splice(i, 1);
    this.guardarLocal();
  }

  scrollToAlumnos() {
    document.getElementById('alumnosSection')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToReportes() {
    document.getElementById('reportesSection')
      ?.scrollIntoView({ behavior: 'smooth' });
  }


    async enviarReporte() {

      if (!this.reporteTexto.trim()) {
        this.toast.error("El reporte no puede estar vacío.");
        return;
      }

      // Obtener datos del profesor guardados al iniciar sesión
      const correo = localStorage.getItem("correo") || "correo_no_registrado";
      const nombre = localStorage.getItem("nombre") || "Profesor";

      const resultado = await this.reportesService.guardarReporte('profesor', {
        remitente: nombre,
        correo: correo,
        texto: this.reporteTexto
      });

      if (!resultado.ok) {
        this.toast.error("Error al enviar reporte: " + resultado.mensaje);
        return;
      }

      this.toast.success("Reporte enviado correctamente.");
      this.reporteTexto = "";
    }

  menuOpen = false;

}
