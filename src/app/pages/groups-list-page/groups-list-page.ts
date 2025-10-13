import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../services/grupo-service'; 
import { Grupo } from '../../interfaces/grupo'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups-list-page',
  templateUrl: './groups-list-page.html',
  styleUrls: ['./groups-list-page.scss'],
  imports:[CommonModule]
})
export class GroupsListPageComponent implements OnInit {
  grupos: Grupo[] = []; 
  cargando = true;

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
}

