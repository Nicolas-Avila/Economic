import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Preferences } from '@capacitor/preferences';
import { EconomicsService } from 'src/app/service/economic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail
  ]
})
export class HistoryListComponent implements OnInit, OnDestroy {
  list: any[] = [];
  subscription!: Subscription; // 👈 suscripción al observable

  constructor(private economicsService: EconomicsService) {}

  ngOnInit() {
    this.loadData();

    // 👇 Suscribirse para recargar cada vez que haya cambios
    this.subscription = this.economicsService.update$.subscribe(() => {
      this.loadData();
    });
  }

  async loadData() {
    const { value } = await Preferences.get({ key: 'economicsData' });
    if (value) {
      this.list = JSON.parse(value);
      console.log('Historial cargado:', this.list);
    } else {
      this.list = [];
      console.log('No hay historial guardado.');
    }
  }

  // 👇 Cancelar la suscripción para evitar fugas de memoria
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
