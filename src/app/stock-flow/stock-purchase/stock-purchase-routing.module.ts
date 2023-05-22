import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockPurchaseComponent } from './stock-purchase.component';

const routes: Routes = [{ path: '', component: StockPurchaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockPurchaseRoutingModule { }
