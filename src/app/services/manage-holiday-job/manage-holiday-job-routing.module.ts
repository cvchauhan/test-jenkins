import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHolidayJobComponent } from './manage-holiday-job.component';

const routes: Routes = [{ path: '', component: ManageHolidayJobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHolidayJobRoutingModule { }
