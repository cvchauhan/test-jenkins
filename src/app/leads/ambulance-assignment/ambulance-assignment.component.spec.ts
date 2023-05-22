import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceAssignmentComponent } from './ambulance-assignment.component';

describe('AmbulanceAssignmentComponent', () => {
  let component: AmbulanceAssignmentComponent;
  let fixture: ComponentFixture<AmbulanceAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbulanceAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
