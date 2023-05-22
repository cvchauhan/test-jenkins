import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApprovalComponent } from './job-approval.component';

const routes: Routes = [{ path: '', component: JobApprovalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobApprovalRoutingModule { }
