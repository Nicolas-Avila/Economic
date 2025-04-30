import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IonInput, IonButton } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';
import { EconomicsService } from 'src/app/service/economic.service';

@Component({
  selector: 'app-expense-income-input',
  templateUrl: './expense-income-input.component.html',
  styleUrls: ['./expense-income-input.component.scss'],
  imports: [IonInput, IonButton, FormsModule]
})
export class ExpenseIncomeInputComponent implements OnInit {
  @Output() inputDataChange = new EventEmitter<any[]>();
  @Input() egress: boolean = false;

  category: string = '';
  mont: number | null = null;
  economicsData: any[] = [];

  constructor(private economicsService: EconomicsService) {} // 👈 INYECTAR SERVICIO

  ngOnInit() {
    this.loadEconomicsData();  
  }

  async loadEconomicsData() {
    const { value } = await Preferences.get({ key: 'economicsData' });
    if (value) {
      this.economicsData = JSON.parse(value);
      this.inputDataChange.emit(this.economicsData);
    }
  }

  async saveEconomicsData() {
    await Preferences.set({
      key: 'economicsData',
      value: JSON.stringify(this.economicsData),
    });
  }

  async obtainValue() {
    if (this.category && this.mont) {
      const newData = { sector: this.category, size: this.mont };
      this.economicsData.push(newData);
      await this.saveEconomicsData();  
      this.inputDataChange.emit([newData]); 
      this.economicsService.notifyUpdate(); // 👈 NOTIFICAR ACTUALIZACIÓN
    }
  }

  async obtainValueEgress() {
    if (this.category && this.mont) {
      const newData = { sector: this.category, size: -this.mont }; // 👈 cambio "-" + this.mont a -this.mont
      this.economicsData.push(newData);  
      await this.saveEconomicsData();  
      this.inputDataChange.emit([newData]); 
      this.economicsService.notifyUpdate(); // 👈 NOTIFICAR ACTUALIZACIÓN
    }
  }

  async clearEconomicsData() {
    await Preferences.remove({ key: 'economicsData' });
    this.economicsData = []; 
    this.economicsService.notifyUpdate(); // 👈 NOTIFICAR BORRADO
  }
}
