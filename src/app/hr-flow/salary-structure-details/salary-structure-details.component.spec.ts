import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryStructureDetailsComponent } from './salary-structure-details.component';

describe('SalaryStructureDetailsComponent', () => {
  let component: SalaryStructureDetailsComponent;
  let fixture: ComponentFixture<SalaryStructureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryStructureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryStructureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
