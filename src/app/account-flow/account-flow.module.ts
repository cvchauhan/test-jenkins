import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { CalendarModule } from 'primeng/calendar';
import { AccountFlowRoutingModule } from './account-flow-routing.module';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { TableModule } from 'primeng/table';
import { ManageLedgerComponent } from './manage-ledger/manage-ledger.component';
import { VoucherEntryComponent } from './voucher-entry/voucher-entry.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccountService } from './account.service';
// import { ConfirmationService, MessageService } from 'primeng/api';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { StockApprovalComponent } from '../account-flow/stock-approval/stock-approval.component';

import { AccountLedgerComponent } from './account-ledger/account-ledger.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { JobReceiptsComponent } from './job-receipts/job-receipts.component';
import { ManageDiscountComponent } from './manage-discount/manage-discount.component';
import { ChipsModule } from 'primeng/chips';
import { SharedPModule } from '../sharedP.module';
import { ReportsComponent } from './reports/reports.component';
import { CardModule } from 'primeng/card';
import { ReportsInnerComponent } from './reports/reports-inner/reports-inner.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MapCommonModule } from '../map-common/map-common.module';
import { CollectionApprovalComponent } from './collection-approval/collection-approval.component';
import { MessageModule } from 'primeng/message';
import { InputDisabledDirective } from './InputDisabledDirective';


@NgModule({
  declarations: [ManageGroupsComponent, ManageLedgerComponent, VoucherEntryComponent, AccountLedgerComponent,
    TaxDetailsComponent, JobReceiptsComponent, ManageDiscountComponent, ReportsComponent, ReportsInnerComponent,
    StockApprovalComponent,
    CollectionApprovalComponent, InputDisabledDirective],
  imports: [
    CommonModule,
    AccountFlowRoutingModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    TabViewModule,
    CalendarModule,
    FormsModule,
    MessagesModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ToastModule,
    InputNumberModule,
    CheckboxModule,
    AutoCompleteModule,
    MultiSelectModule,
    ChipsModule,
    SharedPModule,
    CardModule,
    PdfViewerModule,
    MapCommonModule,
    MessageModule
  ],
  exports: [InputDisabledDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AccountService, MessageService, ConfirmationService,]
})
export class AccountFlowModule { }
