import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { ActivarCuentaDTO } from '../dto/activar-cuenta-dto';


@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "http://localhost:8082/api/general";


 constructor(private http: HttpClient) { }


 public listarTipos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-tipo-eventos`);
 }


 public listarCiudades(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-ciudad-eventos`);
 }


 public listarEventos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-todos-eventos`);
 }


 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener/${id}`);
 }

 public activarCuenta(activarCuentaDTO: ActivarCuentaDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.publicoURL}/activar-cuenta`, activarCuentaDTO);
}


}
