import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) {}

  public setToken(tokesessionStoragen: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, tokesessionStoragen); // Cambiado a tokesessionStoragen
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.getToken() !== null; // Simplificación
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/"]); // Redirige a la página principal después de iniciar sesión
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]); // Redirige a la página de login
  }

  private decodePayload(token: string): any {
    const payload = token.split(".")[1]; // El payload es la segunda parte del JWT
    const payloadDecoded = atob(payload); // Usar atob para decodificar base64
    return JSON.parse(payloadDecoded);
  }

  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id || ""; // Retornar vacío si no existe 'id'
    }
    return "";
  }

  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol || ""; // Retornar vacío si no existe 'rol'
    }
    return "";
  }
}
