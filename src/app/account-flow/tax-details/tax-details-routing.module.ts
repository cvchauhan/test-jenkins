import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxDetailsComponent } from './tax-details.component';

const routes: Routes = [{ path: '', component: TaxDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxDetailsRoutingModule { }
