import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Importa ReactiveFormsModule y CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  // Validación para email
      password: ['', [Validators.required, Validators.minLength(6)]]  // Validación para contraseña
    });
  }

  public login() {
    if (this.loginForm.valid) {
      console.log('Login exitoso:', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
