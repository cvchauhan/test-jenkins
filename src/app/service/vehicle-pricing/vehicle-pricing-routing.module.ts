import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclePricingComponent } from './vehicle-pricing.component';

const routes: Routes = [{ path: '', component: VehiclePricingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclePricingRoutingModule { }
