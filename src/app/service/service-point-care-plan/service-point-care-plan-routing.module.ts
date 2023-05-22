import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePointCarePlanComponent } from './service-point-care-plan.component';

const routes: Routes = [{ path: '', component: ServicePointCarePlanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePointCarePlanRoutingModule { }
