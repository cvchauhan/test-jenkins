import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobClosureApprovalComponent } from './job-closure-approval.component';

describe('JobClosureApprovalComponent', () => {
  let component: JobClosureApprovalComponent;
  let fixture: ComponentFixture<JobClosureApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobClosureApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobClosureApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
