import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearEventoDTO } from '../dto/crear-evento-dto';
import { EditarEventoDTO } from '../dto/editar-evento-dto';
import{ CrearCuponDTO } from '../dto/cupon/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/cupon/editar-cupon-dto';
import { InformacionCuponDTO } from '../dto/cupon/informacion-cupon-dto';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "http://localhost:8082/api/admin";


 constructor(private http: HttpClient) { }

   // Método para crear un cupón
   public crearCupon(cupon: CrearCuponDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-cupon`, cupon);
  }

 public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/evento/crear`, crearEventoDTO);
 }


 public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/evento/editar`, editarEventoDTO);
 }


 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
 }


 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/evento/eliminar/${id}`);
 }


 public listarEventosAdmin(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-todos`);
 }


 public subirImagen(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/imagen/subir`, imagen);
 }


}
