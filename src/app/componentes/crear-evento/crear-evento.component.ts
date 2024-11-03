import { Component } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import Swal from 'sweetalert2';
import { EventoDTO } from '../../dto/evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';



@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {

  crearEventoForm!: FormGroup;
  tiposDeEvento: string[];
  eventosService: any;
  ciudades: string[];



  public crearEvento(){
    this.eventosService.crear(this.crearEventoForm.value as EventoDTO);
    Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
   }



   
 

constructor(private formBuilder: FormBuilder,private publicoService: PublicoService,administradorService: AdministradorService ) {
 this.crearFormulario();
 this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
 this.ciudades = ['armenia', 'cartagena', 'pereira', 'cali'];
 this.listarCiudades();
 this.listarTipos();
 
 
}


private crearFormulario() {
  this.crearEventoForm = this.formBuilder.group({
   nombre: ['', [Validators.required]],
   descripcion: ['', [Validators.required]],
   tipo: ['', [Validators.required]],
   direccion: ['', [Validators.required]],
   ciudad: ['', [Validators.required]],
   localidades: this.formBuilder.array([]),
   imagenPortada: ['', [Validators.required]],
   imagenLocalidades: ['', [Validators.required]]
 });
}
public onFileChange(event:any, tipo:string){
  if (event.target.files.length > 0) {
    const files = event.target.files;


    switch(tipo){
      case 'localidades':
        this.crearEventoForm.get('imagenLocalidades')?.setValue(files[0]);
        break;
      case 'portada':
        this.crearEventoForm.get('imagenPortada')?.setValue(files[0]);
        break;
    }


  }
 }

get localidades(): FormArray {
  return this.crearEventoForm.get('localidades') as FormArray;
}
agregarLocalidad() {
  this.localidades.push(this.formBuilder.control('', Validators.required));
}

eliminarLocalidad(indice: number) {
  this.localidades.removeAt(indice);
}

public listarTipos(){
  this.publicoService.listarTipos().subscribe({
    next: (data) => {
      this.tiposDeEvento = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 
 public listarCiudades(){
  this.publicoService.listarCiudades().subscribe({
    next: (data) => {
      this.ciudades = data.respuesta;
    },
    error: (error) => {
      console.error(error);
    },
  });
 }
 
}
