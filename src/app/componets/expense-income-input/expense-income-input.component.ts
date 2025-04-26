import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IonInput, IonButton } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

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

  constructor() {}

  ngOnInit() {
    this.loadEconomicsData();  // Cargar los datos cuando el componente se inicializa
  }

  // Función para cargar los datos desde Preferences
  async loadEconomicsData() {
    const { value } = await Preferences.get({ key: 'economicsData' });
    if (value) {
      this.economicsData = JSON.parse(value);  // Cargar datos desde el almacenamiento
      console.log('Datos cargados:', this.economicsData);
      this.inputDataChange.emit(this.economicsData)
    } else {
      console.log('No hay datos guardados.');
    }
  }

  // Función para guardar los datos en Preferences
  async saveEconomicsData() {
    await Preferences.set({
      key: 'economicsData',
      value: JSON.stringify(this.economicsData),
    });
    console.log('Datos guardados en Preferences:', this.economicsData);
  }

  obtainValue() {
    if (this.category && this.mont) {
      const newData = { sector: this.category, size: this.mont };
      this.economicsData.push(newData);
      this.saveEconomicsData();  
      this.inputDataChange.emit([newData]); 
    }
  }
  
  obtainValueEgress() {
    if (this.category && this.mont) {
      const newData = { sector: this.category, size: "-" + this.mont };
      this.economicsData.push(newData);  
      this.saveEconomicsData();  
      this.inputDataChange.emit([newData]); 
    }
  }
  

  // Función para borrar los datos
  async clearEconomicsData() {
    await Preferences.remove({ key: 'economicsData' });
    this.economicsData = []; 
    console.log('Todos los datos han sido borrados');
  }
}
