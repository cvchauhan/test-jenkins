import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCaegoryComponent } from './profile-caegory.component';

describe('ProfileCaegoryComponent', () => {
  let component: ProfileCaegoryComponent;
  let fixture: ComponentFixture<ProfileCaegoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCaegoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCaegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
