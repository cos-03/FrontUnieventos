import { Component } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  eventos!: [];
  ciudades!:[];

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.ciudades = [];
    this.obtenerEventos();
    this.listarCiudades();
 }

 public obtenerEventos(){
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 public listarCiudades(){
  this.publicoService.listarCiudades().subscribe({
    next: (data) => {
      this.ciudades = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 
 
 
}
