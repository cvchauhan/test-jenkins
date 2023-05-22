import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAssignmentInternalComponent } from './job-assignment-internal.component';

describe('JobAssignmentInternalComponent', () => {
  let component: JobAssignmentInternalComponent;
  let fixture: ComponentFixture<JobAssignmentInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAssignmentInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAssignmentInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
