import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCarritoDTO } from '../../dto/carrito/detalleCarrito-dto';
import { EventoDTO } from '../../dto/evento-dto';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { CarritoDTO } from '../../dto/carrito/carrito-dto';
import { PublicoService } from '../../servicios/publico.service';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  itemsCarrito!: DetalleCarritoDTO[];
  carrito!: CarritoDTO;
  idCuenta!: any;
  // Mapa para almacenar los nombres de los eventos por idEvento
  nombresEventos = new Map<string, string>();
  preciosItem = new Map<string, number>();

  
  itemsSeleccionados: DetalleCarritoDTO[] = [];
  textoBtnEliminar: string = '';

  constructor(
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private publicoService: PublicoService
  ) {
    this.actualizarMensaje();
    this.obtenerCarrito();
  }

  public obtenerCarrito() {
    this.idCuenta = this.tokenService.getIDCuenta();
    this.clienteService.traerCarritoCliente(this.idCuenta).subscribe({
      next: (data) => {
        this.carrito = data.respuesta;
        this.itemsCarrito = this.carrito.items;

        // Obtener el evento para cada item del carrito
        this.itemsCarrito.forEach((item) => {
          this.obtenerEvento(item.idEvento);
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  actualizarCantidad(item: DetalleCarritoDTO) {
    this.obtenerPrecio(item); // Recalcula el precio para el ítem
    this.clienteService.editarItemCarrito(this.carrito.id, item);
    //console.log('Ítem actualizado:', item);
  }
  

  public obtenerPrecio(item: DetalleCarritoDTO): number {
    // Verificar si ya tenemos el precio calculado para este ítem
    if (this.preciosItem.has(item.idEvento)) {
      return this.preciosItem.get(item.idEvento)! * item.cantidad;
    }
  
    // Llamar al servicio para obtener el evento y su precio
    this.publicoService.obtenerEvento(item.idEvento).subscribe({
      next: (data) => {
        const evento = data.respuesta as EventoDTO;
  
        // Encontrar la localidad correcta y su precio
        const localidad = evento.localidades.find(loc => loc.nombre === item.nombreLocalidad);
        if (localidad) {
          const precioTotal = localidad.precio * item.cantidad;
          this.preciosItem.set(item.idEvento, localidad.precio);
          console.log(`Precio actualizado para el ítem con idEvento ${item.idEvento}:`, precioTotal);
        }
      },
      error: (error) => {
        console.error(`Error obteniendo el evento con idEvento ${item.idEvento}`, error);
      }
    });
  
    // Devolver 0 temporalmente hasta que se obtenga el precio
    return 0;
  }
  
  public obtenerEvento(idEvento: string) {
    // Verificar si el nombre del evento ya está en el mapa para evitar solicitudes duplicadas
    if (!this.nombresEventos.has(idEvento)) {
      this.publicoService.obtenerEvento(idEvento).subscribe({
        next: (data) => {
          // Guardar el nombre del evento en el mapa
          this.nombresEventos.set(idEvento, data.respuesta.nombre);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  seleccionarItem(item: DetalleCarritoDTO, estado: boolean) {
    if (estado) {
      this.itemsSeleccionados.push(item);
    } else {
      const index = this.itemsSeleccionados.indexOf(item);
      if (index !== -1) {
        this.itemsSeleccionados.splice(index, 1);
      }
    }
    this.actualizarMensaje();
  }

  actualizarMensaje() {
    const cantidad = this.itemsSeleccionados.length;
    this.textoBtnEliminar = cantidad === 1 ? '1 elemento' : `${cantidad} elementos`;
  }

  confirmarEliminacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará los items seleccionados del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarItems();
        Swal.fire('Eliminados', 'Los items seleccionados han sido eliminados del carrito.', 'success');
      }
    });
  }

  eliminarItem(item: DetalleCarritoDTO) {
    // Implementar lógica para eliminar un solo item si es necesario
    this.clienteService.eliminarItemCarrito(this.carrito.id, item );
  }

  eliminarItems() {
    this.itemsCarrito = this.itemsCarrito.filter(item => !this.itemsSeleccionados.includes(item));
    this.itemsSeleccionados = [];
    this.actualizarMensaje();
  }

  mostrarCarrito() {
    console.log(this.itemsCarrito);
  }

  trackById(index: number, item: DetalleCarritoDTO) {
    return item.idDetalleCarrito;
  }
}
