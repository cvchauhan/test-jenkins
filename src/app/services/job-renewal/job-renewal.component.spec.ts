import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRenewalComponent } from './job-renewal.component';

describe('JobRenewalComponent', () => {
  let component: JobRenewalComponent;
  let fixture: ComponentFixture<JobRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRenewalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
