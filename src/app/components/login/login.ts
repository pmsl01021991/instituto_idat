import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast.service';

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
    private authService: AuthService,
    private toast: ToastService
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
    this.toast.info("Primero escoge tu rol ⚠️");
  }


  // ====================================================
  // LOGIN ÚNICAMENTE
  // ====================================================
  async login() {

    const tipo = this.loginForm.value.tipo;
    const codigo = this.loginForm.value.codigo;
    const password = this.loginForm.value.password;

    if (!tipo || !codigo || !password) {
      this.toast.error("Complete todos los campos ⚠️");
      return;
    }

    // 🔥 Convertir código → email
    const email = codigo.includes("@") ? codigo : `${codigo}@idat.pe`;

    const resp = await this.authService.login(email, password);

    if (!resp.ok) {
      this.toast.error(resp.mensaje);
      return;
    }

    const rol = resp.mensaje;

    this.toast.success(`Bienvenido ${rol.toUpperCase()} 🎉`);

    switch (rol) {
      case "admin":
        this.router.navigate(['/admin']);
        break;

      case "profesor":
        this.router.navigate(['/profesor']);
        break;

      case "estudiante":
        this.router.navigate(['/estudiante']);
        break;

      default:
        this.toast.error("Rol no reconocido");
    }
  }

}
