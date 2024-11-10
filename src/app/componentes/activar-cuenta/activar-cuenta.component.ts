import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivarCuentaDTO } from '../../dto/activar-cuenta-dto';
import { PublicoService } from '../../servicios/publico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {

  activarCtaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private publicService: PublicoService, private router: Router) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.activarCtaForm = this.formBuilder.group(
      {
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],  
    }
  );
  }

  public activar() {
    const activarCuenta = this.activarCtaForm.value as ActivarCuentaDTO;
  
    this.publicService.activarCuenta(activarCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta activa',
          text: 'La cuenta se ha activado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
   
   
   }
  
}
