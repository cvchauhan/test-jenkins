import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsInnerComponent } from './reports-inner/reports-inner.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [{ path: '', component: ReportsComponent },
{ path: 'report-list', component: ReportsInnerComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
