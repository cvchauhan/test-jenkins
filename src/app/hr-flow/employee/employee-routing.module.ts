import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmpSearchComponent } from './search/emp-search.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'search', component: EmpSearchComponent }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
