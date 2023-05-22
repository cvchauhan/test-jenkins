import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleEntryComponent } from './vehicle-entry.component';

const routes: Routes = [{ path: '', component: VehicleEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleEntryRoutingModule { }
