import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

interface Boleta {
  nombreEvento: string;
  correo: string;
  dueno: string;
  numBoletas: number;
}

@Component({
  selector: 'app-boletas',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './gestion-mis-boletas.component.html',
  styleUrls: ['./gestion-mis-boletas.component.css']
})
export class BoletasComponent {
  filtroBusqueda: string = '';
  boletas: Boleta[] = [
    {
      nombreEvento: 'Evento 1',
      correo: 'correo@gmail.com',
      dueno: 'usuario1',
      numBoletas: 8
    },
    {
      nombreEvento: 'Evento 2',
      correo: 'otrocorreo@gmail.com',
      dueno: 'usuario2',
      numBoletas: 5
    }
  ];

  get boletasFiltradas() {
    return this.boletas.filter(boleta =>
      boleta.nombreEvento.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      boleta.correo.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      boleta.dueno.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  buscarBoletas() {
    console.log('Buscando:', this.filtroBusqueda);
  }

  verDetalle(boleta: Boleta) {
    alert(`Detalle del evento: ${boleta.nombreEvento}`);
  }
}
