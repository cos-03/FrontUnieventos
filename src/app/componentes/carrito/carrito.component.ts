import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCarritoDTO } from '../../dto/carrito/detalleCarrito-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  // Lista de items del carrito
  itemsCarrito: DetalleCarritoDTO[] = [
    { idDetalleCarrito: '1', idEvento: 'E1', nombreLocalidad: 'VIP', cantidad: 2, precioUnitario: 300 },
    { idDetalleCarrito: '2', idEvento: 'E2', nombreLocalidad: 'General', cantidad: 4, precioUnitario: 200 }
  ];

  // Items seleccionados en el carrito
  itemsSeleccionados: DetalleCarritoDTO[] = [];
  textoBtnEliminar: string = '';

  constructor() {
    this.actualizarMensaje();
  }

  // Método para seleccionar un item del carrito
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

  // Actualiza el texto del botón de eliminar según la cantidad de elementos seleccionados
  actualizarMensaje() {
    const cantidad = this.itemsSeleccionados.length;
    this.textoBtnEliminar = cantidad === 1 ? '1 elemento' : `${cantidad} elementos`;
  }

  // Confirma la eliminación de los items seleccionados
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
  
  eliminarItem(item:DetalleCarritoDTO){

  }
  // Método para eliminar los items seleccionados
  eliminarItems() {
    this.itemsCarrito = this.itemsCarrito.filter(item => !this.itemsSeleccionados.includes(item));
    this.itemsSeleccionados = [];
    this.actualizarMensaje();
  }

  // Método para mostrar el contenido del carrito (por ejemplo, al proceder al pago)
  mostrarCarrito() {
    console.log(this.itemsCarrito);
  }

  trackById(index: number, item: DetalleCarritoDTO) {
    return item.idDetalleCarrito;
  }
}
