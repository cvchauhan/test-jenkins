import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobReceiptsComponent } from './job-receipts.component';

const routes: Routes = [{ path: '', component: JobReceiptsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobReceiptsRoutingModule {}
