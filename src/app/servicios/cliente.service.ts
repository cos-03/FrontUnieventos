import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';


import { Observable } from 'rxjs';
import{ CrearOrdenDTO } from '../dto/orden/crear-orden-dto';
import { EditarOrdenDTO } from '../dto/orden/editar-orden-dto';
import { InformacionOrdenDTO } from '../dto/orden/informacion-orden-dto';
import { DetalleCarritoDTO } from '../dto/carrito/detalleCarrito-dto';




@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiURL = "http://localhost:8082/api/cliente";

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('AuthToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  constructor(private http: HttpClient) { }

  // Métodos de Carrito en el servicio frontend

// Agregar item al carrito
public agregarItemCarrito(id: string, item: DetalleCarritoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/agregarItem-carrito/${id}`, item, { headers: this.getAuthHeaders() });
}

// Editar item en el carrito
public editarItemCarrito(id: string, item: DetalleCarritoDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/editarItem-carrito/${id}`, item, { headers: this.getAuthHeaders() });
}

// Eliminar item del carrito
public eliminarItemCarrito(id: string, idDetalleCarrito: string): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.apiURL}/eliminarItem-carrito/${id}/${idDetalleCarrito}`, null, { headers: this.getAuthHeaders() });
}

// Obtener carrito
public traerCarritoCliente(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/traerCarrito-carrito/${id}`, { headers: this.getAuthHeaders() });
}

  // Métodos para Orden

// Crear Orden
public crearOrden(orden: CrearOrdenDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.apiURL}/crear-orden`, orden, { headers: this.getAuthHeaders() });
}

// Actualizar Orden
public actualizarOrden(orden: EditarOrdenDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.apiURL}/actualizar-orden`, orden, { headers: this.getAuthHeaders() });
}

// Eliminar Orden
public eliminarOrden(id: string): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.apiURL}/eliminar-orden/${id}`, { headers: this.getAuthHeaders() });
}

// Obtener Información de Orden
public obtenerInformacionOrden(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-informacion-orden/${id}`, { headers: this.getAuthHeaders() });
}

// Buscar Ordenes por Cliente
public buscarOrdenesPorCliente(id: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-ordenes-cliente-orden/${id}`, { headers: this.getAuthHeaders() });
}

// Buscar Ordenes por Rango de Fechas
public buscarOrdenesPorRangoDeFechas(d1: string, d2: string): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-ordenes-rango-fecha-orden/${d1}/${d2}`, { headers: this.getAuthHeaders() });
}

// Listar Todas las Ordenes
public listarTodasLasOrdenes(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.apiURL}/obtener-ordenes-orden`, { headers: this.getAuthHeaders() });
}

}
