import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePointPricingComponent } from './service-point-pricing.component';

describe('ServicePointPricingComponent', () => {
  let component: ServicePointPricingComponent;
  let fixture: ComponentFixture<ServicePointPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePointPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePointPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
