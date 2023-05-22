import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  //{ path: 'employee', loadChildren: () => import('./hr-flow/employee/employee-routing.module').then(m => m.EmployeeRoutingModule) },
  {
    path: 'service',
    loadChildren: () =>
      import('./service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./recommendation-summary/recommendation-summary.module').then(
        (m) => m.RecommendationSummaryModule
      ),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock-flow/stock-flow.module').then((m) => m.StocksFlowModule),
  },
  {
    path: 'account-flow',
    loadChildren: () =>
      import('./account-flow/account-flow.module').then(
        (m) => m.AccountFlowModule
      ),
  },
  {
    path: 'hr',
    loadChildren: () =>
      import('./hr-flow/hr-flow.module').then((m) => m.HrFlowModule),
  },
  {
    path: 'procurement',
    loadChildren: () =>
      import('./procurement/procurement.module').then(
        (m) => m.ProcurementModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'leads',
    loadChildren: () =>
      import('./leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('./vehicle/vehicle-module').then((m) => m.VehicleModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
