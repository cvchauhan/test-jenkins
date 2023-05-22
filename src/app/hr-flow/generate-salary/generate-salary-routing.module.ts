import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateSalaryComponent } from './generate-salary.component';

const routes: Routes = [{ path: '', component: GenerateSalaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateSalaryRoutingModule { }
