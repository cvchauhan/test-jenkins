import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageEmployeeShiftComponent } from './manage-employee-shift.component';

const routes: Routes = [{ path: '', component: ManageEmployeeShiftComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEmployeeShiftRoutingModule { }
