import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateManageJobComponent } from './add-update-manage-job.component';

describe('AddUpdateManageJobComponent', () => {
  let component: AddUpdateManageJobComponent;
  let fixture: ComponentFixture<AddUpdateManageJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateManageJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateManageJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
