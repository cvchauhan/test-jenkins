import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationSummaryServicepointsComponent } from './recommendation-summary-servicepoints.component';

describe('RecommendationSummaryServicepointsComponent', () => {
  let component: RecommendationSummaryServicepointsComponent;
  let fixture: ComponentFixture<RecommendationSummaryServicepointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationSummaryServicepointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationSummaryServicepointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
