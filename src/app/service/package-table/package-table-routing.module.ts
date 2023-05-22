import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageTableComponent } from './package-table.component';

const routes: Routes = [{ path: '', component: PackageTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageTableRoutingModule { }
