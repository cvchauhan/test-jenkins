import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReceiptsComponent } from './job-receipts.component';

describe('JobReceiptsComponent', () => {
  let component: JobReceiptsComponent;
  let fixture: ComponentFixture<JobReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
