import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Auth } from '../../services/auth';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-contact-list-page',
  imports: [RouterModule, FormsModule,CommonModule,MatIconModule],
  templateUrl: './contact-list-page.html',
  styleUrl: './contact-list-page.scss'
})
export class ContactListPage implements OnInit {
contact: any;
deleteContact(arg0: any) {
throw new Error('Method not implemented.');
}
editContact(arg0: any) {
throw new Error('Method not implemented.');
}
  ngOnInit(): void {
    this.contactsService.getContacts();
  }

  authService = inject(Auth)
  contactsService = inject(ContactsService)

}
