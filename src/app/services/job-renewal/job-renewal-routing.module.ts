import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobRenewalComponent } from './job-renewal.component';

const routes: Routes = [{ path: '', component: JobRenewalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRenewalRoutingModule { }
