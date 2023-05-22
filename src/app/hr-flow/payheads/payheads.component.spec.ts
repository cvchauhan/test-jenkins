import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayheadsComponent } from './payheads.component';

describe('PayheadsComponent', () => {
  let component: PayheadsComponent;
  let fixture: ComponentFixture<PayheadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayheadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayheadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
