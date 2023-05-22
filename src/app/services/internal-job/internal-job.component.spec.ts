import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalJobComponent } from './internal-job.component';

describe('InternalJobComponent', () => {
  let component: InternalJobComponent;
  let fixture: ComponentFixture<InternalJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
