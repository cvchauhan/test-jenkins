import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationSkillsComponent } from './recommendation-skills.component';

describe('RecommendationSkillsComponent', () => {
  let component: RecommendationSkillsComponent;
  let fixture: ComponentFixture<RecommendationSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
