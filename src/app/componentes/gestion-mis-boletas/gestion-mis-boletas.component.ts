import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { BoletaDTO } from '../../dto/boleta/boleta-dto';
import { MensajeDTO } from '../../dto/mensaje-dto';

@Component({
  selector: 'app-boletas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-mis-boletas.component.html',
  styleUrls: ['./gestion-mis-boletas.component.css']
})
export class BoletaComponent implements OnInit {
  boletas: BoletaDTO[] = []; // Lista de boletas
  detalleBoleta: BoletaDTO | null = null; // Detalle de una boleta específica
  mensaje: string = ''; // Mensaje de respuesta
  boleta: MensajeDTO[] = [];
  nombreOId: string = ''; // Agregamos la propiedad 'nombreOId' para enlazar con el formulario de búsqueda
  boletasPendientes!: BoletaDTO[];
  boletasEnviadas!: BoletaDTO[];
  idBoleta!: string;
  idPropietario!: string;

  constructor(private ClienteService: ClienteService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idPropietario = 'ID_DEL_PROPIETARIO';  // Obtén el ID del propietario de la sesión o de algún otro lugar
    this.ClienteService.listarBoletasPorPropietario(idPropietario)
      .subscribe((data: MensajeDTO[]) => {
        this.boletas = data;
      }, (error) => {
        console.error('Error al cargar las boletas:', error);
      });
  
    this.obtenerBoletas();
  }

  // Obtener todas las boletas
  obtenerBoletas(): void {
    this.ClienteService.buscarBoletasPorNombreOIdentificacion(this.nombreOId).subscribe({
      next: (mensajes: MensajeDTO[]) => {
        this.boletas = mensajes.map(mensaje => ({
          idBoleta: mensaje.idBoleta || '',
          idEvento: mensaje.idEvento || '',
          idClientePropietario: mensaje.idClientePropietario || '',
          nombreEvento: mensaje.nombreEvento || '',
          fechaEvento: mensaje.fechaEvento || new Date(),
          nombreLocalidad: mensaje.nombreLocalidad || '',
          estado: mensaje.estado || 'pendiente',
          idPropietarioOriginal: mensaje.idPropietarioOriginal || ''
        }));
        
        // Filtrar las boletas según su estado
        this.boletasPendientes = this.boletas.filter(b => b.estado === 'pendiente');
        this.boletasEnviadas = this.boletas.filter(b => b.estado === 'enviada');
      },
      error: (err) => {
        console.error('Error al obtener boletas', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener boletas',
          text: 'No se pudieron recuperar las boletas. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }



  // Método para buscar boletas por nombre o identificación
  buscarBoletasPorNombreOIdentificacion(): void {
    this.ClienteService.buscarBoletasPorNombreOIdentificacion(this.nombreOId).subscribe({
      next: (mensajes: MensajeDTO[]) => {
        this.boletas = mensajes.map(mensaje => ({
          idBoleta: mensaje.idBoleta || '',
          idEvento: mensaje.idEvento || '',
          idClientePropietario: mensaje.idClientePropietario || '',
          nombreEvento: mensaje.nombreEvento || '',
          fechaEvento: mensaje.fechaEvento || new Date(),
          nombreLocalidad: mensaje.nombreLocalidad || '',
          estado: mensaje.estado || 'pendiente',
          idPropietarioOriginal: mensaje.idPropietarioOriginal || ''
        }));
      },
      error: (err) => {
        console.error('Error al buscar boletas', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar boletas',
          text: 'No se pudieron recuperar las boletas. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Otros métodos aquí...

    // Método para buscar boletas por ID de propietario
    buscarBoletasPorPropietario(): void {
      if (this.idPropietario) {
        this.ClienteService.listarBoletasPorPropietario(this.idPropietario).subscribe(
          (boletas: BoletaDTO[]) => {
            this.boletas = boletas; // Asigna las boletas obtenidas al array de boletas
          },
          (error) => {
            console.error('Error al buscar boletas:', error);
          }
        );
      }
    }



  // Método para listar todas las boletas de un propietario
  listarBoletasPorPropietario(idPropietario: string): void {
    this.ClienteService.listarBoletasPorPropietario(idPropietario).subscribe({
      next: (boletas) => this.boleta = boletas,
      error: (err) => {
        console.error('Error al listar boletas', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al listar boletas',
          text: 'No se pudieron recuperar las boletas del propietario. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para obtener el detalle de una boleta específica
  obtenerDetalleBoleta(idBoleta: string, idPropietario: string): void {
    this.ClienteService.obtenerDetalleBoleta(idBoleta, idPropietario).subscribe({
      next: (boletas) => this.detalleBoleta = boletas,
      error: (err) => {
        console.error('Error al obtener detalle de la boleta', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener detalle',
          text: 'No se pudo obtener el detalle de la boleta. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para listar boletas enviadas de un propietario
  listarBoletasEnviadas(idPropietario: string): void {
    this.ClienteService.listarBoletasEnviadas(idPropietario).subscribe({
      next: (boletas) => this.boleta = boletas,
      error: (err) => {
        console.error('Error al listar boletas enviadas', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al listar boletas enviadas',
          text: 'No se pudieron recuperar las boletas enviadas. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para listar boletas pendientes de un propietario
  listarBoletasPendientes(idPropietario: string): void {
    this.ClienteService.listarBoletasPendientes(idPropietario).subscribe({
      next: (boletas) => this.boleta = boletas,
      error: (err) => {
        console.error('Error al listar boletas pendientes', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al listar boletas pendientes',
          text: 'No se pudieron recuperar las boletas pendientes. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }

  // Método para transferir una boleta a un nuevo propietario
  transferirBoleta(idBoleta: string, idPropietario: string, idNuevoPropietario: string): void {
    this.ClienteService.transferirBoleta(idBoleta, idPropietario, idNuevoPropietario).subscribe({
      next: (mensaje: MensajeDTO) => {
        this.mensaje = this.mensaje;
        Swal.fire({
          icon: 'success',
          title: 'Boleta transferida',
          text: 'La boleta se transfirió exitosamente.'
        });
      },
      error: (err) => {
        console.error('Error al transferir la boleta', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al transferir boleta',
          text: 'No se pudo transferir la boleta. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }
/////
 
  // Método para aceptar una boleta por parte de un nuevo propietario
  aceptarBoleta(idBoleta: string, idNuevoPropietario: string): void {
    this.ClienteService.aceptarBoleta(idBoleta, idNuevoPropietario).subscribe({
      next: (respuesta: MensajeDTO) => {
        this.mensaje = this.mensaje;
        Swal.fire({
          icon: 'success',
          title: 'Boleta aceptada',
          text: 'La boleta ha sido aceptada exitosamente.'
        });
      },
      error: (err) => {
        console.error('Error al aceptar la boleta', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al aceptar boleta',
          text: 'No se pudo aceptar la boleta. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }
}
