import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementReqComponent } from './procurement-req.component';

describe('ProcurementReqComponent', () => {
  let component: ProcurementReqComponent;
  let fixture: ComponentFixture<ProcurementReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
