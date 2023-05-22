import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePointPricingComponent } from './service-point-pricing.component';

const routes: Routes = [{ path: '', component: ServicePointPricingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePointPricingRoutingModule { }
