import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos {

  cursos: any[] = [];
  idTemp: number | null = null;

  curso = {
    nombre: '',
    docente: '',
    creditos: null
  };

  constructor() {
    // ⬅️ Cargar cursos desde localStorage al iniciar
    const data = localStorage.getItem('cursosSistema');
    if (data) {
      this.cursos = JSON.parse(data);
    }
  }

  // Guardar en localStorage
  guardarLocal() {
    localStorage.setItem('cursosSistema', JSON.stringify(this.cursos));
  }

  agregar() {
    if (!this.curso.nombre || !this.curso.docente || !this.curso.creditos) return;

    if (this.idTemp === null) {
      // Crear
      this.cursos.push({ ...this.curso, id: Date.now() });
    } else {
      // Editar
      const index = this.cursos.findIndex(c => c.id === this.idTemp);
      this.cursos[index] = { ...this.curso, id: this.idTemp };
      this.idTemp = null;
    }

    // 🔥 Guardar cambios
    this.guardarLocal();

    this.limpiarFormulario();
  }

  editar(curso: any) {
    this.curso = {
      nombre: curso.nombre,
      docente: curso.docente,
      creditos: curso.creditos
    };
    this.idTemp = curso.id;
  }

  eliminar(id: number) {
    this.cursos = this.cursos.filter(c => c.id !== id);

    // 🔥 Guardar cambios
    this.guardarLocal();
  }

  limpiarFormulario() {
    this.curso = { nombre: '', docente: '', creditos: null };
  }

  menuOpen = false;

}
