import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  constructor(private router: Router) {}
  logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  this.router.navigate(['/login']);
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



