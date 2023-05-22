import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDepositComponent } from './item-deposit.component';

describe('ItemDepositComponent', () => {
  let component: ItemDepositComponent;
  let fixture: ComponentFixture<ItemDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
