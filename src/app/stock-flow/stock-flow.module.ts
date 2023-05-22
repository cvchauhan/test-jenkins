import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { StockFlowModule } from './stock-flow-routing.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ItemDepositComponent } from './item-deposit/item-deposit.component';
import { ItemIssueComponent } from './item-issue/item-issue.component';
import { ItemStockComponent } from './item-stock/item-stock.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { StockService } from './stock.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import {MenuModule} from 'primeng/menu';
import {CheckboxModule} from 'primeng/checkbox';
import { ManageStockService } from './managestock.service';
import { MultiSelectModule } from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
import { SharedPModule } from '../sharedP.module';
import { StockQueryComponent } from './stock-query/stock-query.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MessageModule } from 'primeng/message';
import { StockPurchaseComponent } from './stock-purchase/stock-purchase.component';
import { StockSalesComponent } from './stock-sales/stock-sales.component';
import { StockIssueComponent } from './stock-issue/stock-issue.component';
import { StockDepositComponent } from './stock-deposit/stock-deposit.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { ItemPickupComponent } from './item-pickup/item-pickup.component';
import { ItemIssuePendingComponent } from './item-issue-pending/item-issue-pending.component';

@NgModule({
  declarations: [
    ItemDepositComponent,
    ItemIssueComponent,
    ItemStockComponent,
    ManageTransactionComponent,
    StockQueryComponent,
    StockPurchaseComponent,
    StockSalesComponent,
    StockIssueComponent,
    StockDepositComponent,
    StockTransferComponent,
    ItemPickupComponent,
    ItemIssuePendingComponent,
  ],
  imports: [
    StockFlowModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule,
    FileUploadModule,
    TableModule,
    RadioButtonModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MenuModule,
    CheckboxModule,
    MultiSelectModule,
    ChipsModule,
    SharedPModule,
    PdfViewerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [StockService, MessageService, ConfirmationService, ManageStockService]
})
export class StocksFlowModule { }
