import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobAssignmentComponent } from './job-assignment.component';

const routes: Routes = [{ path: '', component: JobAssignmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobAssignmentRoutingModule { }
