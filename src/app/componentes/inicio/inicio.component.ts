import { Component, OnInit } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule } from '@angular/router';
import { EventoDTO } from '../../dto/evento-dto';
import Swal from 'sweetalert2';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  eventos: ItemEventoDTO[] = [];
  ciudades: string[] = [];
 

  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.ciudades = [];
    this.obtenerEventos();
    this.listarCiudades();
    this.listarEventos();
 }

 ngOnInit(): void {
  this.obtenerEventos();
  this.listarCiudades();
  this.listarEventos();

}

public obtenerEventos() {
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta.map((evento: any) => ({
        ...evento,
        fecha: new Date(evento.fecha)
      }));
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
 public listarEventos(){
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });

}


 }
 