import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationSummaryComponent } from './recommendation-summary.component';

describe('RecommendationSummaryComponent', () => {
  let component: RecommendationSummaryComponent;
  let fixture: ComponentFixture<RecommendationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
