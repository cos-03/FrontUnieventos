import { Component } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  ///muchachoss recordar que los datos estan quemados en la view cambiar esto cuando se una al backend 
  carrito!: FormGroup;  // FormGroup para el carrito

  constructor(private formBuilder: FormBuilder) {
    this.inicializarFormulario();
  }

  // Método para inicializar el formulario
  inicializarFormulario() {
    this.carrito = this.formBuilder.group({
      items: this.formBuilder.array([])  // Puedes añadir más controles aquí según los campos necesarios
    });
  }

  // Método que se llama al hacer submit
  public Mostrarcarrito() {
    if (this.carrito) {
      console.log(this.carrito.value);  // Asegúrate de que el formulario esté inicializado
    } else {
      console.error('Formulario no inicializado');
    }
  }
}
