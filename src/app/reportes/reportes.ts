import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../services/reportes.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class Reportes {

  profesores: any[] = [];
  estudiantes: any[] = [];

  constructor(private reportesService: ReportesService) {}

  async ngOnInit() {
    const data = await this.reportesService.obtenerReportes();
    this.profesores = data.profesores;
    this.estudiantes = data.estudiantes;
  }


  menuOpen = false;
}
