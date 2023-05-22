import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSalesComponent } from './stock-sales.component';

const routes: Routes = [{ path: '', component: StockSalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockSalesRoutingModule { }
