import { Injectable } from '@angular/core';
import { Grupo } from '../interfaces/grupo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  constructor() {}

  // Simulamos obtener los grupos del usuario logueado
  obtenerGruposUsuario(usuarioId: number): Observable<Grupo[]> {
    const grupos: Grupo[] = [
      { id: 1, nombre: 'Familia' },
      { id: 2, nombre: 'Trabajo' },
      { id: 3, nombre: 'Amigos' }
    ];

    // Simulación (más adelante podés reemplazar por un request HTTP)
    return of(grupos);
  }
}
