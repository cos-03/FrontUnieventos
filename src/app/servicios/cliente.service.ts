import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';


import { Observable } from 'rxjs';
import{ CrearOrdenDTO } from '../dto/orden/crear-orden-dto';
import { EditarOrdenDTO } from '../dto/orden/editar-orden-dto';
import { InformacionOrdenDTO } from '../dto/orden/informacion-orden-dto';




@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private authURL = "http://localhost:8082/api/cliente";

  constructor(private http: HttpClient) { }

  // Métodos para Orden
  crearOrden(orden: CrearOrdenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-orden`, orden);
  }

  actualizarOrden(orden: EditarOrdenDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/actualizar-orden`, orden);
  }

  eliminarOrden(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/eliminar-orden/${id}`);
  }

  obtenerInformacionOrden(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtener-informacion-orden/${id}`);
  }

  buscarOrdenesPorCliente(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtener-ordenes-cliente-orden/${id}`);
  }

  buscarOrdenesPorRangoDeFechas(d1: string, d2: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtener-ordenes-rango-fecha-orden/${d1}/${d2}`);
  }

  listarTodasLasOrdenes(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtener-ordenes-orden`);
  }
}
