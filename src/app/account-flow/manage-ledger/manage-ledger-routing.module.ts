import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageLedgerComponent } from './manage-ledger.component';

const routes: Routes = [{ path: '', component: ManageLedgerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageLedgerRoutingModule { }
