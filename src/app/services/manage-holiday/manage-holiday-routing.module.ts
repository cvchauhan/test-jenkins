import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHolidayComponent } from './manage-holiday.component';

const routes: Routes = [{ path: '', component: ManageHolidayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHolidayRoutingModule { }
