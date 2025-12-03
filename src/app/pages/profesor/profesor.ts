import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'profesor-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profesor.html',
  styleUrls: ['./profesor.css']
})
export class Profesor {

  constructor(private router: Router) {
    const data = localStorage.getItem("alumnosSistema");
  if (data) this.alumnos = JSON.parse(data);
  }
  logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  this.router.navigate(['/login']);
}
  alumnos: any[] = [];
buscador = "";

nuevoAlumno = { nombre: "", correo: "" };
editIndex: number | null = null;
alumnoEditado = { nombre: "", correo: "" };

 
  


guardarLocal() {
  localStorage.setItem("alumnosSistema", JSON.stringify(this.alumnos));
}

// FILTRO POR NOMBRE O CORREO
get alumnosFiltrados() {
  return this.alumnos.filter(a =>
    a.nombre.toLowerCase().includes(this.buscador.toLowerCase()) ||
    a.correo.toLowerCase().includes(this.buscador.toLowerCase())
  );
}

// AGREGAR ALUMNO
agregarAlumno() {
  const { nombre, correo } = this.nuevoAlumno;

  if (!nombre || !correo)
    return alert("Debes completar los dos campos.");

  if (!correo.startsWith("ac"))
    return alert("El correo del alumno debe iniciar con 'ac'.");

  this.alumnos.push({ ...this.nuevoAlumno });

  this.guardarLocal();

  this.nuevoAlumno = { nombre: "", correo: "" };
}

// EDITAR ALUMNO
editarAlumno(i: number) {
  this.editIndex = i;
  this.alumnoEditado = { ...this.alumnos[i] };
}

// GUARDAR CAMBIOS
guardarAlumno(i: number) {
  if (!this.alumnoEditado.nombre || !this.alumnoEditado.correo)
    return alert("Los campos no pueden estar vacíos.");

  if (!this.alumnoEditado.correo.startsWith("ac"))
    return alert("El correo del alumno debe iniciar con 'ac'.");

  this.alumnos[i] = { ...this.alumnoEditado };
  this.editIndex = null;

  this.guardarLocal();
}

// ELIMINAR
eliminarAlumno(i: number) {
  this.alumnos.splice(i, 1);
  this.guardarLocal();
}

// SCROLL
scrollToAlumnos() {
  document.getElementById('alumnosSection')?.scrollIntoView({ behavior: 'smooth' });
}



  menuOpen = false;

}
