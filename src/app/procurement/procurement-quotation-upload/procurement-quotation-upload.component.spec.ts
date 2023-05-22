import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementQuotationUploadComponent } from './procurement-quotation-upload.component';

describe('ProcurementQuotationUploadComponent', () => {
  let component: ProcurementQuotationUploadComponent;
  let fixture: ComponentFixture<ProcurementQuotationUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementQuotationUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementQuotationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
