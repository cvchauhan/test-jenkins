import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobClosureComponent } from './job-closure.component';

const routes: Routes = [{ path: '', component: JobClosureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobClosureRoutingModule { }
