import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [],
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css'
})
export class HistorialComprasComponent {
  historialCompras!: string ;
  
  clienteService: any;
  ordenes: any;

  constructor (private tokenService: TokenService){

  }

  public listarHistorialOrdenesCompra(){


    const codigoCliente = this.tokenService.getCodigo();
 
 
    this.clienteService.listarHistorialCompras(codigoCliente).subscribe({
      next: (data: { respuesta: any; }) => {
        this.ordenes = data.respuesta;
      },
      error: (error: { error: { respuesta: any; }; }) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
 }
 

}
