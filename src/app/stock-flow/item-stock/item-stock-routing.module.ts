import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemStockComponent } from './item-stock.component';

const routes: Routes = [{ path: '', component: ItemStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemStockRoutingModule { }
