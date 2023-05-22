import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApprovalComponent } from './job-approval.component';

describe('JobApprovalComponent', () => {
  let component: JobApprovalComponent;
  let fixture: ComponentFixture<JobApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
