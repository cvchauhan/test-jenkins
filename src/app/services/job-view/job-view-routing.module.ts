import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobViewComponent } from './job-view.component';

const routes: Routes = [{ path: '', component: JobViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobViewRoutingModule { }
