import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTableComponent } from './package-table.component';

describe('PackageTableComponent', () => {
  let component: PackageTableComponent;
  let fixture: ComponentFixture<PackageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
