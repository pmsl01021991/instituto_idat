import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { ToastService } from '../../services/toast.service';


@Component({
  standalone: true,
  selector: 'app-estudiante',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css',
})
export class Estudiante {

  constructor(private router: Router, private reportesService: ReportesService, private toast: ToastService) {}
  logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  this.router.navigate(['/login']);
}

  cursos = [
    {
      nombre: "Seminario Sobre Retos y Reflexiones Sociales",
      docente: "Dr. Luis Martínez",
      notas: "Aún no registradas",
      color: "amarillo",
      reporte: ""
    },
    {
      nombre: "Innovación Centrada en Personas",
      docente: "Mg. Rosa López",
      notas: "15, 18, 17",
      color: "verde",
      reporte: ""
    },
    {
      nombre: "Desarrollo de Habilidades Interpersonales",
      docente: "Ps. Javier Huamán",
      notas: "18, 19, 17",
      color: "celeste",
      reporte: ""
    },
    {
      nombre: "Desarrollo de los Componentes del Negocio",
      docente: "Lic. Patricia Torres",
      notas: "16, 17, 15",
      color: "azul",
      reporte: ""
    },
    {
      nombre: "Desarrollo de Interfaces 3",
      docente: "Ing. Marcos Rivas",
      notas: "19, 18, 20",
      color: "menta",
      reporte: ""
    },
    {
      nombre: "Patrones de Diseño de Software",
      docente: "Ing. Carlos Ventura",
      notas: "14, 16, 18",
      color: "morado",
      reporte: ""
    },
  ];

  cursoAbierto: number | null = null;

  toggleCurso(i: number) {
    this.cursoAbierto = this.cursoAbierto === i ? null : i;
  }

  enviarReporte(curso: any) {

    if (!curso.reporte || curso.reporte.trim() === "") {
      this.toast.error("Por favor, escribe un mensaje antes de enviar el reporte.");
      return;
    }

    // 🔥 Obtener datos del estudiante desde localStorage
    const correo = localStorage.getItem("correo") || "Correo no registrado";
    const nombre = localStorage.getItem("nombre") || "Nombre no registrado";

    // Guardar reporte en localStorage
    this.reportesService.guardarReporte('estudiante', {
      remitente: nombre,
      correo: correo,
      curso: curso.nombre,
      texto: curso.reporte,
      fecha: new Date().toLocaleString()
    });

    this.toast.success("Reporte enviado correctamente.");
    curso.reporte = "";
  }

  menuOpen = false;

}
