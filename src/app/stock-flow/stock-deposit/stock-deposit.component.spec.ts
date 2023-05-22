import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDepositComponent } from './stock-deposit.component';

describe('StockDepositComponent', () => {
  let component: StockDepositComponent;
  let fixture: ComponentFixture<StockDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
