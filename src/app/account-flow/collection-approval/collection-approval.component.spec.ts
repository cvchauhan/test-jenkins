import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionApprovalComponent } from './collection-approval.component';

describe('CollectionApprovalComponent', () => {
  let component: CollectionApprovalComponent;
  let fixture: ComponentFixture<CollectionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
