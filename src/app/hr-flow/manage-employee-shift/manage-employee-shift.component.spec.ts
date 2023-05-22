import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeShiftComponent } from './manage-employee-shift.component';

describe('ManageEmployeeShiftComponent', () => {
  let component: ManageEmployeeShiftComponent;
  let fixture: ComponentFixture<ManageEmployeeShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeeShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
