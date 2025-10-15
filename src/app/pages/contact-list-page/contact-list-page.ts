import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list-page',
  imports: [RouterModule, FormsModule, CommonModule, MatIconModule],
  templateUrl: './contact-list-page.html',
  styleUrl: './contact-list-page.scss'
})
export class ContactListPage implements OnInit {
  router = inject(Router);
  authService = inject(Auth);
  contactsService = inject(ContactsService);
  
  contacts: any[] = [];
  filteredContacts: any[] = [];

  async ngOnInit(): Promise<void> {
    await this.cargarContactos();
  }

  async cargarContactos() {
    try {
      await this.contactsService.getContacts();
      this.contacts = this.contactsService.contacts || [];
      this.filteredContacts = [...this.contacts]; // Inicializar filteredContacts
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  }
  editContact(contacto: any) {
    this.router.navigate(['/contacts', contacto.id, 'edit']);
  }

  async deleteContact(contacto: any) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `¿Quieres eliminar a <strong>${contacto.firstName} ${contacto.lastName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel'
      },
      background: 'white',
      buttonsStyling: true,
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await this.contactsService.deleteContact(contacto.id);
        Swal.fire({
          title: '¡Eliminado!',
          text: `El contacto ${contacto.firstName} ${contacto.lastName} ha sido eliminado.`,
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            confirmButton: 'swal-btn-ok'
          },
          buttonsStyling: true,
          background: 'white'
        });
        await this.cargarContactos();
      } catch (error) {
        console.error('Error al eliminar contacto:', error);
        Swal.fire('Error', 'No se pudo eliminar el contacto', 'error');
      }
    }
  }
}