import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'designation',
    loadChildren: () =>
      import('./designation/designation.module').then(
        (m) => m.DesignationModule
      ),
  },
  {
    path: 'employee-attendence',
    loadChildren: () =>
      import('./employee-attendance/employee-attendance.module').then(
        (m) => m.EmployeeAttendanceModule
      ),
  },
  {
    path: 'employee-tracking',
    loadChildren: () =>
      import('./employee-tracking/employee-tracking.module').then(
        (m) => m.EmployeeTrackingModule
      ),
  },
  {
    path: 'generate-salary',
    loadChildren: () =>
      import('./generate-salary/generate-salary.module').then(
        (m) => m.GenerateSalaryModule
      ),
  },
  {
    path: 'manage-employee-shift',
    loadChildren: () =>
      import('./manage-employee-shift/manage-employee-shift.module').then(
        (m) => m.ManageEmployeeShiftModule
      ),
  },
  {
    path: 'manage-shift',
    loadChildren: () =>
      import('./manage-shift/manage-shift.module').then(
        (m) => m.ManageShiftModule
      ),
  },
  {
    path: 'payheads',
    loadChildren: () =>
      import('./payheads/payheads.module').then((m) => m.PayheadsModule),
  },
  {
    path: 'salary-process',
    loadChildren: () =>
      import('./salary-process/salary-process.module').then(
        (m) => m.SalaryProcessModule
      ),
  },
  {
    path: 'salary-structure',
    loadChildren: () =>
      import('./salary-structure/salary-structure.module').then(
        (m) => m.SalaryStructureModule
      ),
  },
  {
    path: 'salary-structure-details',
    loadChildren: () =>
      import('./salary-structure-details/salary-structure-details.module').then(
        (m) => m.SalaryStructureDetailsModule
      ),
  },
  {
    path: 'user-defined-payhead',
    loadChildren: () =>
      import('./user-defined-payhead/user-defined-payhead.module').then(
        (m) => m.UserDefinedPayheadModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrFlowRoutingModule {}
