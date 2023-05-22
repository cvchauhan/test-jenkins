import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransportPointComponent } from './transport-point/transport-point.component';
const routes: Routes = [
  {path:'', component: TransportPointComponent},
  {path:'transport-point', component: TransportPointComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
