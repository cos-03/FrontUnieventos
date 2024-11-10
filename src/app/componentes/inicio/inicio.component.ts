import { Component, OnInit } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule } from '@angular/router';
import { EventoDTO } from '../../dto/evento-dto';
import Swal from 'sweetalert2';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  eventos: ItemEventoDTO[] = [];
  ciudades: string[] = [];
  eventosFiltrados!: ItemEventoDTO[];
  selectedCiudad: string = '';
  selectedFecha: string = '';
  selectedEvento: string = '';
 

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

public obtenerEventos(): void {
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta.map((evento: any) => ({
        ...evento,
        fecha: new Date(evento.fecha) // Asegura que la fecha esté correctamente formateada
      }));
      this.eventosFiltrados = [...this.eventos]; // Inicializar eventos filtrados con todos los eventos
    },
    error: (error) => {
      console.error(error);
    },
  });
}

public listarCiudades(): void {
  this.publicoService.listarCiudades().subscribe({
    next: (data) => {
      this.ciudades = data.respuesta; // Cargar ciudades
    },
    error: (error) => {
      console.error(error);
    },
  });
}

// Método para filtrar eventos
public filtrarEventos(): void {
  console.log('Filtrando eventos...');
  console.log('Ciudad seleccionada:', this.selectedCiudad);
  console.log('Fecha seleccionada:', this.selectedFecha);
  console.log('Evento seleccionado:', this.selectedEvento);

  this.eventosFiltrados = this.eventos.filter((evento) => {
    // Asegurarse de que la fecha sea un objeto Date
    let eventoFecha = new Date(evento.fecha); // Convierte la fecha a un objeto Date
    
    let matchesCiudad = this.selectedCiudad ? evento.ciudad === this.selectedCiudad : true;
    let matchesFecha = this.selectedFecha ? eventoFecha.toISOString().split('T')[0] === this.selectedFecha : true;
    let matchesEvento = this.selectedEvento ? evento.nombre === this.selectedEvento : true;
    
    console.log('Evento:', evento.nombre, ' - Ciudad:', evento.ciudad, ' - Fecha:', eventoFecha);
    return matchesCiudad && matchesFecha && matchesEvento;
  });
  
  console.log('Eventos filtrados:', this.eventosFiltrados);
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
 