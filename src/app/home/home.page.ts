import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { NavbarComponent } from '../componets/navbar/navbar.component';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { GraficCircleComponent } from '../componets/grafic-circle/grafic-circle.component';
import { ExpenseIncomeInputComponent } from '../componets/expense-income-input/expense-income-input.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, GraficCircleComponent,ExpenseIncomeInputComponent]
})
export class HomePage implements OnInit {
  chartData: any[] = [];

  constructor() { }

  ngOnInit() {

  }

  updateChartData(newData: any[]) {
    this.chartData = [...this.chartData, ...newData];
  }

}
