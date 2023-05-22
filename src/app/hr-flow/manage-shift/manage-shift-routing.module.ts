import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageShiftComponent } from './manage-shift.component';

const routes: Routes = [{ path: '', component: ManageShiftComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageShiftRoutingModule { }
