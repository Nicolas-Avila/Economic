import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from '../componets/navbar/navbar.component';

@Component({
  selector: 'app-folder',
  standalone: true,
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    NavbarComponent
  ],
})
export class FolderPage implements OnInit {
  constructor() {}

  ngOnInit() {
    // lógica de inicialización si es necesaria
  }
}
