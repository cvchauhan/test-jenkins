import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSearchComponent } from './emp-search.component';

describe('SearchComponent', () => {
  let component: EmpSearchComponent;
  let fixture: ComponentFixture<EmpSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
