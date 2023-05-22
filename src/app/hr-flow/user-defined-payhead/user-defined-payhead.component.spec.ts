import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDefinedPayheadComponent } from './user-defined-payhead.component';

describe('UserDefinedPayheadComponent', () => {
  let component: UserDefinedPayheadComponent;
  let fixture: ComponentFixture<UserDefinedPayheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDefinedPayheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDefinedPayheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
