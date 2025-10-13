import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../services/grupo-service'; 
import { Grupo } from '../../interfaces/grupo'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list-page.html',
  styleUrls: ['./groups-list-page.scss'],
  imports:[CommonModule,FormsModule]
})
export class GroupsListPage implements OnInit {
  grupos: Grupo[] = []; 
  cargando = true;
  mostrarFormulario = false;
  nuevoGrupo: Grupo = { id: 0, nombre: '' };

  constructor(private grupoService: GrupoService) {}

  ngOnInit() {
    const usuarioId = 1; 
    this.grupoService.obtenerGruposUsuario(usuarioId).subscribe({
      next: (data) => {
        this.grupos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }
  crearGrupo() {
  if (!this.nuevoGrupo.nombre.trim()) return; // evita guardar vacío

  const nuevo = { ...this.nuevoGrupo, id: Date.now() }; // crea nuevo grupo temporal
  this.grupos.push(nuevo); // lo agrega al listado
  this.nuevoGrupo = { id: 0, nombre: '' }; // limpia el formulario
  this.mostrarFormulario = false; // cierra el form
}
cancelar() {
  this.nuevoGrupo = { id: 0, nombre: '' }; // limpia datos
  this.mostrarFormulario = false; // oculta formulario
}
}

