import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-expense-income-input',
  templateUrl: './expense-income-input.component.html',
  styleUrls: ['./expense-income-input.component.scss'],
  imports: [IonInput, IonButton, FormsModule]
})
export class ExpenseIncomeInputComponent implements OnInit {
  @Output() inputDataChange = new EventEmitter<any[]>(); // 🔹 EventEmitter para enviar datos al padre
  category: string = '';
  mont: number | null = null;

  constructor() {}

  ngOnInit() {}

  obtainValue() {
    if (this.category && this.mont) {
      const newData = { sector: this.category, size: this.mont };
      this.inputDataChange.emit([newData]); // 🔹 Enviar datos al padre
    }
  }
}
