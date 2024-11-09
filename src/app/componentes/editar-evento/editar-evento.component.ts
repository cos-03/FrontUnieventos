import { Component } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import Swal from 'sweetalert2';
import { EventoDTO } from '../../dto/evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent {



  editarEventoForm!: FormGroup;
  tiposDeEvento: string[];
  eventosService: any;
  ciudades: string[];
  imagenPortada?: File;
  imagenLocalidades?: File;
  
  //adminService: any;



  public editarEvento(){


    const crearEventoDTO = this.editarEventoForm.value as CrearEventoDTO;

    this.adminService.crearEvento(crearEventoDTO).subscribe({
      next: (data: { respuesta: any; }) => {
        Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
      },
      error: (error: { error: { respuesta: string | undefined; }; }) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
   
   
   }
   



   
 

constructor(private formBuilder: FormBuilder,private publicoService: PublicoService,private adminService: AdministradorService ) {
 this.crearFormulario();
 this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
 this.ciudades = ['armenia', 'cartagena', 'pereira', 'cali'];
 this.listarCiudades();
 this.listarTipos();

 
 
}



private crearFormulario() {
  this.editarEventoForm = this.formBuilder.group({
   id:['', [Validators.required]],
   nombre: ['', [Validators.required]],
   descripcion: ['', [Validators.required]],
   tipo: ['', [Validators.required]],
   direccion: ['', [Validators.required]],
   ciudad: ['', [Validators.required]],
   localidades: this.formBuilder.array([]),
   imagenImportada: ['', [Validators.required]],
   fechaEvento: ['', Validators.required], // Campo de fecha
   imagenLocalidades: ['', [Validators.required]]
   
 });
}
public onFileChange(event: any, tipo: string) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    tipo == 'localidades' ? (this.imagenLocalidades = file) : (this.imagenPortada = file);
  }
 }
 

get localidades(): FormArray {
  return this.editarEventoForm.get('localidades') as FormArray;
}
agregarLocalidad() {
  const localidadFormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    precio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    capacidadMaxima: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  });
  this.localidades.push(localidadFormGroup);
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
 
 public subirImagen(tipo:string){
  const formData = new FormData();
  const imagen = tipo == 'portada' ? this.imagenPortada : this.imagenLocalidades;
  const formControl = tipo == 'portada' ? 'imagenImportada' : 'imagenLocalidades';
 
 
  formData.append('imagen', imagen!);

  this.adminService.subirImagen(formData).subscribe({
    next: (data: { respuesta: any; }) => {
      this.editarEventoForm.get(formControl)?.setValue(data.respuesta);
      Swal.fire("Exito!", "Se ha subido la imagen.", "success");
    },
    error: (error: { error: { respuesta: string | undefined; }; }) => {
      Swal.fire("Error!", error.error.respuesta, "error");
    }
  });
 
 
 }

 
 
}
