import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-estudiante',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css',
})
export class Estudiante {

  constructor(private router: Router) {}
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
      alert("Por favor, escribe un mensaje antes de enviar el reporte.");
      return;
    }

    alert(`Reporte enviado para el curso:\n\n${curso.nombre}\n\nContenido:\n${curso.reporte}`);
    curso.reporte = "";
  }

  menuOpen = false;

}
