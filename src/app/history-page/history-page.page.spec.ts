import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryPagePage } from './history-page.page';

describe('HistoryPagePage', () => {
  let component: HistoryPagePage;
  let fixture: ComponentFixture<HistoryPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
