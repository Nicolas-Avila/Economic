import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  imports: [JsonPipe,CommonModule,IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle,IonItem,IonLabel,IonList,IonThumbnail]
})
export class HistoryListComponent implements OnInit {
  
  @Input() list: any[] = [];

  constructor() {}

  ngOnInit() {
    console.log("A VER QUE TRAE ACA ESTO")
    console.log(this.list)
  }
}
