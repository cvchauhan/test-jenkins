import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentDataComponent } from './steps/assessment-data/assessment-data.component';
import { RecommendationSkillsComponent } from './steps/recommendation-skills/recommendation-skills.component';
import { RecommendationSummaryServicepointsComponent } from './recommendation-summary-servicepoints/recommendation-summary-servicepoints.component';
import { RecommendationSummaryComponent } from './recommendation-summary/recommendation-summary.component';
import { StepsComponent } from './steps/steps.component';
import { MedicineComponent } from './steps/medicine/medicine.component';
import { StepsummaryComponent } from './steps/stepsummary/stepsummary.component';

const routes: Routes = [
  { path: '', component: RecommendationSummaryComponent },
  { path: 'steps/assessment', component: AssessmentDataComponent },
  { path: 'steps', component: StepsComponent },
  { path: 'steps/skill', component: RecommendationSkillsComponent },
  { path: 'steps/medicine', component: MedicineComponent },
  { path: 'steps/stepsummary', component: StepsummaryComponent },
  { path: 'service', component: RecommendationSummaryServicepointsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationSummaryRoutingModule { }


