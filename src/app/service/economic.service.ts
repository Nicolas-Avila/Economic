import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EconomicsService {
  private updateSubject = new Subject<void>();
  update$ = this.updateSubject.asObservable();

  notifyUpdate() {
    this.updateSubject.next();
  }
}
