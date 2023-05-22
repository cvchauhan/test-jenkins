import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobClosureApprovalComponent } from './job-closure-approval.component';

const routes: Routes = [{ path: '', component: JobClosureApprovalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobClosureApprovalRoutingModule { }
