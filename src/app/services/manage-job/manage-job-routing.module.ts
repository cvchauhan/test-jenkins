import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageJobComponent } from './manage-job.component';

const routes: Routes = [{ path: '', component: ManageJobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageJobRoutingModule { }
