import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account-ledger',
    loadChildren: () =>
      import('./account-ledger/account-ledger.module').then(
        (m) => m.AccountLedgerModule
      ),
  },
  {
    path: 'collection-approval',
    loadChildren: () =>
      import('./collection-approval/collection-approval.module').then(
        (m) => m.CollectionApprovalModule
      ),
  },
  {
    path: 'job-receipts',
    loadChildren: () =>
      import('./job-receipts/job-receipts.module').then(
        (m) => m.JobReceiptsModule
      ),
  },
  {
    path: 'manage-discount',
    loadChildren: () =>
      import('./manage-discount/manage-discount.module').then(
        (m) => m.ManageDiscountModule
      ),
  },
  {
    path: 'manage-groups',
    loadChildren: () =>
      import('./manage-groups/manage-groups.module').then(
        (m) => m.ManageGroupsModule
      ),
  },
  {
    path: 'manage-ledger',
    loadChildren: () =>
      import('./manage-ledger/manage-ledger.module').then(
        (m) => m.ManageLedgerModule
      ),
  },
  {
    path: 'stock-approval',
    loadChildren: () =>
      import('./stock-approval/stock-approval.module').then(
        (m) => m.StockApprovalModule
      ),
  },
  {
    path: 'tax-details',
    loadChildren: () =>
      import('./tax-details/tax-details.module').then(
        (m) => m.TaxDetailsModule
      ),
  },
  {
    path: 'voucher-entry',
    loadChildren: () =>
      import('./voucher-entry/voucher-entry.module').then(
        (m) => m.VoucherEntryModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountFlowRoutingModule {}
