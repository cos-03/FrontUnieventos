import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

interface Cupon {
  codigo: string;
  nombre: string;
  descuento: number;
  fechaVencimiento: string;
  tipo: string;
  estado: string;
}

@Component({
  selector: 'app-gestion-cupones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-cupones.component.html',
  styleUrl: './gestion-cupones.component.css'
})
export class GestionCuponesComponent {
  cupones: Cupon[] = [
    { codigo: 'CUPO001', nombre: 'Descuento 20%', descuento: 20, fechaVencimiento: '31/12/2024', tipo: 'Único', estado: 'Activo' },
    { codigo: 'CUPO002', nombre: 'Descuento 10%', descuento: 10, fechaVencimiento: '15/11/2024', tipo: 'Recurrente', estado: 'Activo' },
    { codigo: 'CUPO003', nombre: 'Descuento 5%', descuento: 5, fechaVencimiento: '01/10/2024', tipo: 'Único', estado: 'Inactivo' },
  ];

  cuponesSeleccionados: Cupon[] = [];
  textoBtnDesactivar: string = '';

  crearCupon() {
    Swal.fire('Crear Cupón', 'Funcionalidad para crear un nuevo cupón.', 'info');
  }

  editarCupon(cupon: Cupon) {
    Swal.fire('Editar Cupón', `Editando cupón: ${cupon.codigo}`, 'info');
  }

  seleccionarCupon(cupon: Cupon, estado: boolean) {
    if (estado) {
      this.cuponesSeleccionados.push(cupon);
    } else {
      const index = this.cuponesSeleccionados.indexOf(cupon);
      if (index !== -1) {
        this.cuponesSeleccionados.splice(index, 1);
      }
    }
    this.actualizarMensaje();
  }

  actualizarMensaje() {
    const tam = this.cuponesSeleccionados.length;
    this.textoBtnDesactivar = tam === 1 ? '1 elemento' : `${tam} elementos`;
  }

  confirmarDesactivacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cambiará el estado de los cupones seleccionados a Inactivos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactivarCupones();
        Swal.fire('Desactivados', 'Los cupones seleccionados han sido desactivados.', 'success');
      }
    });
  }

  desactivarCupones() {
    this.cuponesSeleccionados.forEach((cupon) => {
      cupon.estado = 'Inactivo';
    });
    this.cuponesSeleccionados = [];
    this.actualizarMensaje();
  }

  trackById(index: number, item: Cupon) {
    return item.codigo;
  }
}
