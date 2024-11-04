import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrl: './recuperar-contrasenia.component.css'
})
export class RecuperarContraseniaComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  // Validación para email
    });
  }

  public validar() {
    if (this.loginForm.valid) {
      console.log('Validación exitosa:', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

}
