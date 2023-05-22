import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementApprovalComponent } from './procurement-approval.component';

describe('ProcurementApprovalComponent', () => {
  let component: ProcurementApprovalComponent;
  let fixture: ComponentFixture<ProcurementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
