import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockQueryComponent } from './stock-query.component';

const routes: Routes = [{ path: '', component: StockQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockQueryRoutingModule { }
