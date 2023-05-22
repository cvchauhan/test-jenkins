import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryStructureDetailsComponent } from './salary-structure-details.component';

const routes: Routes = [{ path: '', component: SalaryStructureDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryStructureDetailsRoutingModule { }
