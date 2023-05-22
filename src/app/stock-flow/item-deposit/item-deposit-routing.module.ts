import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDepositComponent } from './item-deposit.component';

const routes: Routes = [{ path: '', component: ItemDepositComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDepositRoutingModule { }
