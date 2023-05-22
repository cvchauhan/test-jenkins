import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockApprovalComponent } from './stock-approval.component';

const routes: Routes = [{ path: '', component: StockApprovalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockApprovalRoutingModule { }
