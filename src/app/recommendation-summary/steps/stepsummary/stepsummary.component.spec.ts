import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsummaryComponent } from './stepsummary.component';

describe('StepsummaryComponent', () => {
  let component: StepsummaryComponent;
  let fixture: ComponentFixture<StepsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
