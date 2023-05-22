import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryProcessComponent } from './salary-process.component';

const routes: Routes = [{ path: '', component: SalaryProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryProcessRoutingModule { }
