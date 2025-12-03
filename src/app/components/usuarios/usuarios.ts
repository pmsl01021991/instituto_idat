import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {

  nuevoUsuario = {
    email: '',
    pass: '',
    tipo: ''
  };

  usuariosGuardados: any[] = [];
  buscador = "";
  editIndex: number | null = null;

  constructor() {
    const data = localStorage.getItem('usuariosSistema');
    if (data) this.usuariosGuardados = JSON.parse(data);
  }

  // ====================
  // FILTRO BUSCADOR
  // ====================
  get usuariosFiltrados() {
    return this.usuariosGuardados.filter(u =>
      u.email.toLowerCase().includes(this.buscador.toLowerCase()) ||
      u.tipo.toLowerCase().includes(this.buscador.toLowerCase())
    );
  }

  // ====================
  // CREAR O EDITAR
  // ====================
  guardarUsuario() {
    const { email, pass, tipo } = this.nuevoUsuario;

    if (!email || !pass || !tipo) {
      alert("Completa todos los campos");
      return;
    }

    // Validar prefijos
    if (tipo === "profesor" && !email.startsWith("pc")) {
      alert("Los correos de profesores deben empezar con 'pc'");
      return;
    }

    if (tipo === "estudiante" && !email.startsWith("ac")) {
      alert("Los correos de estudiantes deben empezar con 'ac'");
      return;
    }

    // Evitar duplicados si está creando
    if (this.editIndex === null && this.usuariosGuardados.some(u => u.email === email)) {
      alert("Este correo ya está registrado");
      return;
    }

    // Si está editando
    if (this.editIndex !== null) {
      this.usuariosGuardados[this.editIndex] = { ...this.nuevoUsuario };
      this.editIndex = null;
      alert("Usuario actualizado correctamente");
    } else {
      // Crear usuario nuevo
      this.usuariosGuardados.push({ ...this.nuevoUsuario });
      alert('Usuario creado correctamente');
    }

    localStorage.setItem('usuariosSistema', JSON.stringify(this.usuariosGuardados));

    this.nuevoUsuario = { email: '', pass: '', tipo: '' };
  }

  // ====================
  // EDITAR
  // ====================
  editarUsuario(i: number) {
    this.editIndex = i;
    this.nuevoUsuario = { ...this.usuariosGuardados[i] };
  }

  // ====================
  // ELIMINAR
  // ====================
  eliminarUsuario(i: number) {
    if (confirm("¿Eliminar este usuario?")) {
      this.usuariosGuardados.splice(i, 1);
      localStorage.setItem('usuariosSistema', JSON.stringify(this.usuariosGuardados));
    }
  }

  menuOpen = false;

}
