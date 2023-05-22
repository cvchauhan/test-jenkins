import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLedgerComponent } from './customer-ledger.component';

const routes: Routes = [{ path: '', component: CustomerLedgerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLedgerRoutingModule { }
