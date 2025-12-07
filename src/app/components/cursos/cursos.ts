import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos {

  cursos: any[] = [];
  idTemp: string | null = null;

  curso = {
    nombre: '',
    docente: '',
    creditos: null
  };

  // Para validar permisos
  esAdmin = false;

  constructor(private cursosService: CursosService) {}

  async ngOnInit() {
    // Verificar rol
    this.esAdmin = localStorage.getItem("role") === "admin";

    // Si no es admin, redirigir
    if (!this.esAdmin) {
      alert("Solo el ADMIN puede gestionar cursos.");
      window.location.href = "/login";
      return;
    }

    // Cargar cursos desde Firestore
    this.cursos = await this.cursosService.obtenerCursos();
  }

  // ➤ Agregar o editar curso
  async agregar() {
    if (!this.curso.nombre || !this.curso.docente || !this.curso.creditos) return;

    if (this.idTemp === null) {
      // Crear curso
      await this.cursosService.crearCurso(this.curso);
    } else {
      // Editar curso
      await this.cursosService.actualizarCurso(this.idTemp, this.curso);
      this.idTemp = null;
    }

    // Recargar cursos
    this.cursos = await this.cursosService.obtenerCursos();

    this.limpiarFormulario();
  }

  // ➤ Editar curso
  editar(curso: any) {
    this.curso = {
      nombre: curso.nombre,
      docente: curso.docente,
      creditos: curso.creditos
    };
    this.idTemp = curso.id;
  }

  // ➤ Eliminar curso
  async eliminar(id: string) {
    if (!confirm("¿Eliminar curso?")) return;

    await this.cursosService.eliminarCurso(id);
    this.cursos = await this.cursosService.obtenerCursos();
  }

  limpiarFormulario() {
    this.curso = { nombre: '', docente: '', creditos: null };
  }

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  menuOpen = false;
}
