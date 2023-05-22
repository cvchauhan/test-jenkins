import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInnerComponent } from './reports-inner.component';

describe('ReportsInnerComponent', () => {
  let component: ReportsInnerComponent;
  let fixture: ComponentFixture<ReportsInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
