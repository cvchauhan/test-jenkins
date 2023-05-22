import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleAvailabilityComponent } from './vehicle-availability.component';

const routes: Routes = [{ path: '', component: VehicleAvailabilityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleAvailabilityRoutingModule { }
