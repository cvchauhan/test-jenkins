import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobClosureComponent } from './job-closure.component';

describe('JobClosureComponent', () => {
  let component: JobClosureComponent;
  let fixture: ComponentFixture<JobClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobClosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
