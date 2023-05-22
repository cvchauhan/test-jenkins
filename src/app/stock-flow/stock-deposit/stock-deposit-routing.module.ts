import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDepositComponent } from './stock-deposit.component';

const routes: Routes = [{ path: '', component: StockDepositComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockDepositRoutingModule { }
