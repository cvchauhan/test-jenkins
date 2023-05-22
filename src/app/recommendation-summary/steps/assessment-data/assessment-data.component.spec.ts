import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDataComponent } from './assessment-data.component';

describe('AssessmentDataComponent', () => {
  let component: AssessmentDataComponent;
  let fixture: ComponentFixture<AssessmentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
