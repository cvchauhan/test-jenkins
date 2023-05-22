import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  {
    path: 'report-details/:reportType/:menuId/:rdlName',
    component: ReportDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
