import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePointCarePlanComponent } from './service-point-care-plan.component';

describe('ServicePointCarePlanComponent', () => {
  let component: ServicePointCarePlanComponent;
  let fixture: ComponentFixture<ServicePointCarePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePointCarePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePointCarePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
