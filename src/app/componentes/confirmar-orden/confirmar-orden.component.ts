import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de agregar esta línea

@Component({
  selector: 'app-confirmar-orden',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './confirmar-orden.component.html',
  styleUrls: ['./confirmar-orden.component.css']
})
export class ConfirmarOrdenComponent {
  codigoCupon: string = '';
  totalPagado: number = 400;
  descuentoAplicable: number = 0;
  totalFinal: number = this.totalPagado;

  aplicarCupon() {
    // Validación de un código de cupón, aquí puedes agregar más lógica o conectarlo a una API
    if (this.codigoCupon === 'DESCUENTO50') {
      this.descuentoAplicable = 50;
      this.calcularTotalFinal();
    } else {
      alert('Cupón no válido');
      this.descuentoAplicable = 0;
      this.calcularTotalFinal();
    }
  }

  calcularTotalFinal() {
    this.totalFinal = this.totalPagado - this.descuentoAplicable;
  }

  confirmarPago() {
    alert('Pago confirmado. Gracias por su compra.');
    // Aquí puedes agregar la lógica para finalizar el proceso de pago
  }
}
