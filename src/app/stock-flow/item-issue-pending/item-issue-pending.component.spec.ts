import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemIssuePendingComponent } from './item-issue-pending.component';

describe('ItemIssuePendingComponent', () => {
  let component: ItemIssuePendingComponent;
  let fixture: ComponentFixture<ItemIssuePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemIssuePendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemIssuePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
