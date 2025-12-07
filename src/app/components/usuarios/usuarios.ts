import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UsuariosService } from '../../services/usuarios.service';

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

  usuariosGuardados: any[] = []; // Usuarios de Firestore
  buscador = "";
  editUid: string | null = null;  // UID del usuario que se edita

  constructor(
    private toast: ToastService,
    private usuariosService: UsuariosService
  ) {
    // 🔥 Cargar usuarios reales desde Firestore
    this.usuariosService.obtenerUsuarios().subscribe((users: any) => {
      this.usuariosGuardados = users;
    });
  }

  // Filtro buscador
  get usuariosFiltrados() {
    return this.usuariosGuardados.filter(u =>
      u.email.toLowerCase().includes(this.buscador.toLowerCase()) ||
      u.tipo.toLowerCase().includes(this.buscador.toLowerCase()) ||
      u.nombre.toLowerCase().includes(this.buscador.toLowerCase())
    );
  }

  // =========================================================
  //   CREAR O ACTUALIZAR USUARIO
  // =========================================================
  async guardarUsuario() {
    const { nombre, email, pass, tipo } = this.nuevoUsuario;

    if (!nombre || !email || !tipo || (!this.editUid && !pass)) {
      this.toast.error("Completa todos los campos.");
      return;
    }

    // Validación profesor
    if (tipo === "profesor" && !email.startsWith("pc")) {
      this.toast.error("El correo de profesor debe empezar con 'pc'.");
      return;
    }

    // Validación estudiante
    if (tipo === "estudiante" && !email.startsWith("ac")) {
      this.toast.error("El correo de estudiante debe empezar con 'ac'.");
      return;
    }

    // ----------------------------------
    //    EDITAR USUARIO (Firestore)
    // ----------------------------------
    if (this.editUid) {
      await this.usuariosService.actualizarUsuario(this.editUid, {
        nombre,
        email: `${email}@idat.pe`,
        tipo
      });

      this.toast.success("Usuario actualizado correctamente.");
      this.editUid = null;
      this.nuevoUsuario = { nombre: '', email: '', pass: '', tipo: '' };
      return;
    }

    // ----------------------------------
    //    CREAR USUARIO NUEVO
    // ----------------------------------
    const emailCompleto = `${email}@idat.pe`;

    const result = await this.usuariosService.crearUsuario(
      nombre,
      emailCompleto,
      pass,
      tipo
    );

    if (!result.ok) {
      this.toast.error("Error al crear usuario: " + result.mensaje);
      return;
    }

    this.toast.success("Usuario creado correctamente.");

    this.nuevoUsuario = { nombre: '', email: '', pass: '', tipo: '' };
  }

  // =========================================================
  //   CARGAR USUARIO PARA EDITAR
  // =========================================================
  editarUsuario(i: number) {
    const usuario = this.usuariosFiltrados[i];

    this.editUid = usuario.uid;

    // Quitar @idat.pe al editar
    const correoSinDominio = usuario.email.replace("@idat.pe", "");

    this.nuevoUsuario = {
      nombre: usuario.nombre,
      email: correoSinDominio,
      pass: "",
      tipo: usuario.tipo
    };
  }

  // =========================================================
  //   ELIMINAR USUARIO (Auth + Firestore)
  // =========================================================
  async eliminarUsuario(i: number) {
    const user = this.usuariosFiltrados[i];

    if (!confirm("¿Eliminar este usuario?")) return;

    await this.usuariosService.eliminarUsuario(user.uid);

    this.toast.success("Usuario eliminado correctamente.");

    // Si estabas editando ese usuario, se resetea
    if (this.editUid === user.uid) {
      this.editUid = null;
      this.nuevoUsuario = { nombre: '', email: '', pass: '', tipo: '' };
    }
  }

  isDarkMode = false;

ngOnInit() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    this.isDarkMode = true;
    document.body.classList.add('dark-mode');
  }
}

toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;

  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}


  menuOpen = false;
}
