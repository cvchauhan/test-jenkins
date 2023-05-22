import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'item-deposit', loadChildren: () => import('./item-deposit/item-deposit.module').then(m => m.ItemDepositModule)
  },
  {
    path: 'itemissue', loadChildren: () => import('./item-issue/item-issue.module').then(m => m.ItemIssueModule)
  },
  {
    path: 'manage-stock', loadChildren: () => import('./item-stock/item-stock.module').then(m => m.ItemStockModule)
  },
  {
    path: 'stock-transaction', loadChildren: () => import('./manage-transaction/manage-transaction.module').then(m => m.ManageTransactionModule)
  },
  {
    path: 'stock-query', loadChildren: () => import('./stock-query/stock-query.module').then(m => m.StockQueryModule)
  },
  {
    path: 'stock-purchase', loadChildren: () => import('./stock-purchase/stock-purchase.module').then(m => m.StockPurchaseModule)
  },
  {
    path: 'stock-sales', loadChildren: () => import('./stock-sales/stock-sales.module').then(m => m.StockSalesModule)
  },
  {
    path: 'stock-issue', loadChildren: () => import('./stock-issue/stock-issue.module').then(m => m.StockIssueModule)
  },
  {
    path: 'stock-deposit', loadChildren: () => import('./stock-deposit/stock-deposit.module').then(m => m.StockDepositModule)
  },
  {
    path: 'stock-transfer', loadChildren: () => import('./stock-transfer/stock-transfer.module').then(m => m.StockTransferModule)
  },
  {
    path: 'item-pickup', loadChildren: () => import('./item-pickup/item-pickup.module').then(m => m.ItemPickupModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockFlowModule { }
