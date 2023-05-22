import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPickupComponent } from './item-pickup.component';

describe('ItemPickupComponent', () => {
  let component: ItemPickupComponent;
  let fixture: ComponentFixture<ItemPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
