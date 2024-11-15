import { Component } from '@angular/core';
import { EventoDTO } from '../../dto/evento-dto';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { PublicoService } from '../../servicios/publico.service';

import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent {
  codigoEvento: string = '';
  evento: InformacionEventoDTO | undefined;
  crearEventoForm!: FormGroup;
  localidades!: FormArray;


  constructor(
    private route: ActivatedRoute,
    private publicoService: PublicoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const codigoEvento = params['id'];
      this.obtenerEventoId(codigoEvento);
    });
  }

  obtenerEventoId(id: string): void {
    this.publicoService.obtenerEvento(id).subscribe({
      next: (data) => {
        if (data && data.respuesta) {
          this.evento = data.respuesta;
        } else {
          Swal.fire('¡Error!', 'No se pudo cargar el evento.', 'error');
        }
      },
      error: () => {
        Swal.fire('¡Error!', 'No se pudo cargar el evento.', 'error');
      }
    });
  }
}