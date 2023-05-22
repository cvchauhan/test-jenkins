import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePointsComponent } from './service-points.component';

const routes: Routes = [{ path: '', component: ServicePointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePointsRoutingModule { }
