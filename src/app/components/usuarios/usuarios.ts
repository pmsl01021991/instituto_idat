import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {

  nuevoUsuario = {
    nombre: '',
    email: '',
    pass: '',
    tipo: ''
  };

  usuariosGuardados: any[] = [];
  buscador = "";
  editIndex: number | null = null;

  constructor(private toast: ToastService) {
    const data = localStorage.getItem('usuariosSistema');
    if (data) this.usuariosGuardados = JSON.parse(data);
  }

  get usuariosFiltrados() {
    return this.usuariosGuardados.filter(u =>
      u.email.toLowerCase().includes(this.buscador.toLowerCase()) ||
      u.tipo.toLowerCase().includes(this.buscador.toLowerCase()) ||
      u.nombre.toLowerCase().includes(this.buscador.toLowerCase())
    );
  }

  guardarUsuario() {
    const { nombre, email, pass, tipo } = this.nuevoUsuario;

    if (!nombre || !email || !pass || !tipo) {
      this.toast.error("Completa todos los campos.");
      return;
    }

    if (tipo === "profesor" && !email.startsWith("pc")) {
      this.toast.error("El correo de profesor debe empezar con 'pc'.");
      return;
    }

    if (tipo === "estudiante" && !email.startsWith("ac")) {
      this.toast.error("El correo de estudiante debe empezar con 'ac'.");
      return;
    }

    if (this.editIndex === null && this.usuariosGuardados.some(u => u.email === email)) {
      this.toast.error("Este correo ya está registrado.");
      return;
    }

    if (this.editIndex !== null) {
      this.usuariosGuardados[this.editIndex] = { ...this.nuevoUsuario };
      this.editIndex = null;
    } 
    else {
      this.usuariosGuardados.push({ ...this.nuevoUsuario });

      // SOLO agregar estudiantes al panel del profesor
      if (tipo === "estudiante") {
        const alumnos = JSON.parse(localStorage.getItem("alumnosSistema") || "[]");

        alumnos.push({
          nombre: nombre,
          correo: email
        });

        localStorage.setItem("alumnosSistema", JSON.stringify(alumnos));
      }
    }

    localStorage.setItem('usuariosSistema', JSON.stringify(this.usuariosGuardados));

    this.nuevoUsuario = { nombre: '', email: '', pass: '', tipo: '' };

    this.toast.success("Usuario guardado correctamente.");
  }

  editarUsuario(i: number) {
    const usuario = this.usuariosFiltrados[i];

    // índice REAL dentro de usuariosGuardados
    const realIndex = this.usuariosGuardados.indexOf(usuario);

    this.editIndex = realIndex;

    this.nuevoUsuario = { ...usuario };
  }


  eliminarUsuario(i: number) {
    if (confirm("¿Eliminar este usuario?")) {

      const eliminado = this.usuariosGuardados[i];

      // Si es estudiante, también eliminarlo del panel del profesor
      if (eliminado.tipo === "estudiante") {
        const alumnos = JSON.parse(localStorage.getItem("alumnosSistema") || "[]");
        const filtrados = alumnos.filter((a: any) => a.correo !== eliminado.email);
        localStorage.setItem("alumnosSistema", JSON.stringify(filtrados));
      }

      this.usuariosGuardados.splice(i, 1);
      localStorage.setItem('usuariosSistema', JSON.stringify(this.usuariosGuardados));

      // 🔥 MUY IMPORTANTE: resetear la edición
      this.editIndex = null;

      // Reiniciar formulario si estabas editando ese usuario
      this.nuevoUsuario = { nombre: '', email: '', pass: '', tipo: '' };
    }
  }


  menuOpen = false;
}
