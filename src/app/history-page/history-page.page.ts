import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HistoryListComponent } from '../componets/history-list/history-list.component';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.page.html',
  styleUrls: ['./history-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HistoryListComponent]
})
export class HistoryPagePage implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log("HISTORIAL ABIERTO")
  }

}
