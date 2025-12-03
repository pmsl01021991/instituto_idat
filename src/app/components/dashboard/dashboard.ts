import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  irUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  irCursos() {
    this.router.navigate(['/cursos']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
