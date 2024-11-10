import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CambiarPasswordDTO } from '../../dto/cambiar-contrasenia-dto';
import { PublicoService } from '../../servicios/publico.service';


@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, FormsModule],
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent {
  nombreUsuario: string = 'Erik';
  email: string = 'erik@gmail.com';
  codigoVerificacion: string = '';
  contraseniaAnterior: string = '';
  nuevaContrasenia: string = '';
  confirmarNuevaContrasenia: string = '';
  cambiarContraseniaDto!:CambiarPasswordDTO;

  constructor(private formBuilder: FormBuilder, private publicoService: PublicoService){

  }
  obtenerCodigoVerificacion() {
    // Simulación de obtener código de verificación
    this.publicoService.enviarCodigoActivacion(this.email).subscribe({
      next: (data) => {
        Swal.fire('Código enviado', 'El código de verificación ha sido enviado a su email.', 'success');
        console.log(data);
        //this.codigoVerificacion = data.respuesta;
        //this.editarCuentaForm.reset(); // Limpiar el formulario tras actualizar la cuenta
      },
      error: (error) => {
        Swal.fire('¡Error!', 'Ocurrió un error al actualizar la cuenta.', 'error');
        console.log(error);

      }
    });
    //this.codigoVerificacion = '123456'; // Este sería el código que se envía al correo
   // Swal.fire('Código enviado', 'El código de verificación ha sido enviado a su email.', 'success');
  }

  guardar() {
    if (this.nuevaContrasenia !== this.confirmarNuevaContrasenia) {
      Swal.fire('Error', 'La nueva contraseña y la confirmación no coinciden.', 'error');
      return;
    }
    const cambio: CambiarPasswordDTO = {
      correo: this.email,
      codigoVerificacion: this.codigoVerificacion,
      password: this.nuevaContrasenia
  
    };

    // Simulación de guardado de nueva contraseña
   this.publicoService.cambiarPassword(cambio);
    Swal.fire('Éxito', 'La contraseña ha sido cambiada exitosamente.', 'success');
    // Aquí puedes añadir la lógica para actualizar la contraseña en el backend
  }

  volver() {
    // Redirigir o realizar otra acción
    Swal.fire('Redirigiendo', 'Volviendo a la página anterior.', 'info');
  }
}
