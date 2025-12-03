import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  showPassword = false;
  mensajeRol: string | null = null;

  userTypes = ['admin', 'profesor', 'estudiante'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      tipo: ['', Validators.required],
      codigo: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, Validators.required]
    });
  }

  onTipoChange() {
    const tipo = this.loginForm.get('tipo')?.value;

    if (tipo) {
      this.loginForm.get('codigo')?.enable();
      this.loginForm.get('password')?.enable();
    } else {
      this.loginForm.get('codigo')?.disable();
      this.loginForm.get('password')?.disable();
      this.loginForm.get('codigo')?.reset();
      this.loginForm.get('password')?.reset();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  alertarSiNoRol() {
    this.mostrarMensaje("Primero escoge tu rol ⚠️", "info");
  }


  // ====================================================
  // LOGIN ÚNICAMENTE
  // ====================================================
  login() {

    // LOGIN ADMIN
    if (
      this.loginForm.value.tipo === 'admin' &&
      this.loginForm.value.codigo === 'admin123' &&
      this.loginForm.value.password === 'pmsl123'
    ) {
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "admin");

      this.mostrarMensaje("Bienvenido Administrador 👑", "success");
      this.router.navigate(['/admin']);
      return;
    }

    // CORREGIDO: BUSCAR USUARIOS EN usuariosSistema
    const listaUsuarios = JSON.parse(localStorage.getItem("usuariosSistema") || "[]");

    const encontrado = listaUsuarios.find((u: any) =>
      u.email === this.loginForm.value.codigo &&
      u.pass === this.loginForm.value.password &&
      u.tipo === this.loginForm.value.tipo
    );

    if (!encontrado) {
      this.mostrarMensaje("Credenciales incorrectas. Por favor, verifica tus datos.", "error");
      return;
    }

    localStorage.setItem("token", "user-token");
    localStorage.setItem("role", encontrado.tipo);
    localStorage.setItem("nombre", encontrado.nombre);
    localStorage.setItem("correo", encontrado.email);

    this.mostrarMensaje(`Bienvenido ${encontrado.tipo.toUpperCase()} 🎓`, "success");

    switch (encontrado.tipo) {
      case "profesor":
        this.router.navigate(['/profesor']);
        break;

      case "estudiante":
        this.router.navigate(['/estudiante']);
        break;

      case "admin": // Se agrega por si creas admins desde el módulo Usuarios
        this.router.navigate(['/admin']);
        break;
    }
  }

  mostrarMensaje(texto: string, tipo: "success" | "error" | "info") {

    const toast = document.createElement("div");
    toast.classList.add("toast-mensaje", tipo);
    toast.textContent = texto;

    // 🔥 Inserta SIEMPRE en el <body> global
    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
      toast.classList.add("show");
    });

    // Remover después de 3s
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }



}
