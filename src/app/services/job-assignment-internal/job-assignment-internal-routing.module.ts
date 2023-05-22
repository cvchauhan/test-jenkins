import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobAssignmentInternalComponent } from './job-assignment-internal.component';

const routes: Routes = [{ path: '', component: JobAssignmentInternalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobAssignmentInternalRoutingModule { }
