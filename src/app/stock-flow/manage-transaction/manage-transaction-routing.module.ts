import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTransactionComponent } from './manage-transaction.component';

const routes: Routes = [{ path: '', component: ManageTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTransactionRoutingModule { }
