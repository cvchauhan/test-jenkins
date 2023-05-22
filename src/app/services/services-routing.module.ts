import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalJobComponent } from './internal-job/internal-job.component';
import { EditJobComponent } from './internal-job/edit-job/edit-job.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'managejob',
    pathMatch: 'full',
  },
  {
    path: 'managejob',
    loadChildren: () =>
      import('./manage-job/manage-job.module').then((m) => m.ManageJobModule),
  },
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance-routing.module').then(
        (m) => m.AmbulanceRoutingModule
      ),
  },
  {
    path: 'job-assignment-external',
    loadChildren: () =>
      import('./job-assignment/job-assignment.module').then(
        (m) => m.JobAssignmentModule
      ),
  },
  {
    path: 'manage-holiday',
    loadChildren: () =>
      import('./manage-holiday/manage-holiday.module').then(
        (m) => m.ManageHolidayModule
      ),
  },
  {
    path: 'manage-holiday-job',
    loadChildren: () =>
      import('./manage-holiday-job/manage-holiday-job.module').then(
        (m) => m.ManageHolidayJobModule
      ),
  },
  {
    path: 'job-approval',
    loadChildren: () =>
      import('./job-approval/job-approval.module').then(
        (m) => m.JobApprovalModule
      ),
  },
  {
    path: 'customer-ledger',
    loadChildren: () =>
      import('./customer-ledger/customer-ledger.module').then(
        (m) => m.CustomerLedgerModule
      ),
  },
  {
    path: 'job-view',
    loadChildren: () =>
      import('./job-view/job-view.module').then((m) => m.JobViewModule),
  },
  {
    path: 'job-closure-approval',
    loadChildren: () =>
      import('./job-closure-approval/job-closure-approval.module').then(
        (m) => m.JobClosureApprovalModule
      ),
  },
  {
    path: 'job-closure',
    loadChildren: () =>
      import('./job-closure/job-closure.module').then(
        (m) => m.JobClosureModule
      ),
  },
  {
    path: 'job-running-sheet',
    loadChildren: () =>
      import('./job-running-sheet/job-running-sheet.module').then(
        (m) => m.JobRunningSheetModule
      ),
  },
  {
    path: 'job-renewal',
    loadChildren: () =>
      import('./job-renewal/job-renewal.module').then(
        (m) => m.JobRenewalModule
      ),
  },
  {
    path: 'job-assignment-internal',
    loadChildren: () =>
      import('./job-assignment-internal/job-assignment-internal.module').then(
        (m) => m.JobAssignmentInternalModule
      ),
  },
  { path: 'internal-job', component: InternalJobComponent },
  { path: 'edit-job/:id', component: EditJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
