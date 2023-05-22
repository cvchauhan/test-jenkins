import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobViewCustomerLedgerComponent } from './job-view-customer-ledger.component';

describe('JobViewCustomerLedgerComponent', () => {
  let component: JobViewCustomerLedgerComponent;
  let fixture: ComponentFixture<JobViewCustomerLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobViewCustomerLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobViewCustomerLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
