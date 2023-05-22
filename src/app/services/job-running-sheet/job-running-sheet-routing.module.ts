import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobRunningSheetComponent } from './job-running-sheet.component';

const routes: Routes = [{ path: '', component: JobRunningSheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRunningSheetRoutingModule { }
