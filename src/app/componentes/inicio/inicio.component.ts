import { Component, OnInit } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule } from '@angular/router';
import { EventoDTO } from '../../dto/evento-dto';
import Swal from 'sweetalert2';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../servicios/token.service';
import { TipoEventoDTO } from '../../dto/tipo-evento-dto';
import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  eventosTodos!:ItemEventoDTO[];
  eventos: ItemEventoDTO[] = [];
  ciudades: string[] = [];
  eventosFiltrados!: ItemEventoDTO[];
  selectedCiudad: string = '';
  selectedFecha: string = '';
  selectedEvento: string = '';
  idCuenta!: any;

  evetosPreferencia!: EventoDTO;

  eventosPreferencia: ItemEventoDTO[] = [];

  filtrarPorPreferencia: boolean = false; // Nueva propiedad para el checkbox

  //preferenciasUsuario!: TipoEventoDTO[] ;
  preferenciasUsuario: string[] = [];

  // Lista de tipos de evento
  tiposEvento = ["DEPORTE", "CONCIERTO", "CULTURAL", "MODA", "BELLEZA"];
  // Estado de la ventana emergente
  mostrarVentanaPreferencias = false;

   // Abrir y cerrar la ventana de preferencias
   abrirVentanaPreferencias(): void {
    this.mostrarVentanaPreferencias = true;
  }

  cerrarVentanaPreferencias(): void {
    this.mostrarVentanaPreferencias = false;
  }
    // Seleccionar o deseleccionar un tipo de evento
    toggleSeleccion(tipo: string): void {
      const index = this.preferenciasUsuario.findIndex(preferencia => preferencia === tipo);
      if (index >= 0) {
        this.preferenciasUsuario.splice(index, 1); // Deseleccionar
      } else {
        this.preferenciasUsuario.push(tipo); // Seleccionar
      }
    }
  
    // Verificar si un tipo está seleccionado
    estaSeleccionado(tipo: string): boolean {
      return this.preferenciasUsuario.includes(tipo);
    }
  
    // Guardar las preferencias seleccionadas
    guardarPreferencias(): void {
      //this.preferenciasUsuario = this.preferenciasUsuario.map(tipo => ({ tipoEvento: tipo }));
      this.mostrarVentanaPreferencias = false;
      this.clienteService.agregarPreferenciasUsuario(this.idCuenta, this.preferenciasUsuario).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
      console.log("Preferencias guardadas:", this.preferenciasUsuario);
    }

  public mostrarEventosPreferidosCliente(){
    if (this.filtrarPorPreferencia) {
      this.publicoService.obtenerPreferenciasUsuario(this.idCuenta).subscribe({
        next: (data) => {
          this.eventosPreferencia = data.map((evento: any) => ({
            ...evento,
            fecha: new Date(evento.fecha),
          }));
          this.eventosFiltrados = [...this.eventosPreferencia];
          this.eventos = this.eventosFiltrados;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.eventos = this.eventosTodos;
    }
  }



  constructor(private publicoService: PublicoService,private tokenService: TokenService, private clienteService:ClienteService) {
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
  this.idCuenta = this.tokenService.getIDCuenta();
  

}

public obtenerEventos(): void {
  this.publicoService.listarEventos().subscribe({
    next: (data) => {
      this.eventos = data.respuesta.map((evento: any) => ({
        ...evento,
        fecha: new Date(evento.fecha) // Asegura que la fecha esté correctamente formateada
      }));
      this.eventosFiltrados = [...this.eventos]; // Inicializar eventos filtrados con todos los eventos
      this.eventosTodos = this.eventos;
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
