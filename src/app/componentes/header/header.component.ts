import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { EditarCuentaDTO } from '../../dto/editar-cuenta-dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Unieventos';
  isLogged = false;
  correo: string = "";
  IdCuenta: string = "";

  // Accesibilidad
  fontSize = 16;
  highContrast = false;

  constructor(private tokenService: TokenService) {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.correo = this.tokenService.getCorreo();
      this.IdCuenta = this.tokenService.getIDCuenta();
    }

    // Restaurar preferencias si existen
    const savedFont = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast');

    if (savedFont) {
      this.fontSize = parseInt(savedFont);
      document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
    }

    if (savedContrast === 'true') {
      this.highContrast = true;
      document.body.classList.add('high-contrast');
    }
  }

  public logout() {
    this.tokenService.logout();
  }

  increaseFont() {
    this.fontSize = Math.min(this.fontSize + 2, 24);
    document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  decreaseFont() {
    this.fontSize = Math.max(this.fontSize - 2, 12);
    document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  toggleContrast() {
    this.highContrast = !this.highContrast;
    document.body.classList.toggle('high-contrast', this.highContrast);
    localStorage.setItem('highContrast', this.highContrast.toString());
  }
}