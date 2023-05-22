import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayheadsComponent } from './payheads.component';

const routes: Routes = [{ path: '', component: PayheadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayheadsRoutingModule { }
