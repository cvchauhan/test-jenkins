import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHolidayJobComponent } from './manage-holiday-job.component';

describe('ManageHolidayJobComponent', () => {
  let component: ManageHolidayJobComponent;
  let fixture: ComponentFixture<ManageHolidayJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHolidayJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHolidayJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
