import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportPointComponent } from './transport-point.component';

describe('TransportPointComponent', () => {
  let component: TransportPointComponent;
  let fixture: ComponentFixture<TransportPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
