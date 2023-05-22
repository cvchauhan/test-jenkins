import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRunningSheetComponent } from './job-running-sheet.component';

describe('JobRunningSheetComponent', () => {
  let component: JobRunningSheetComponent;
  let fixture: ComponentFixture<JobRunningSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRunningSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRunningSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
