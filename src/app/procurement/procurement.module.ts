import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import { ProcurementRoutingModule } from './procurement-routing.module';
import { ProcurementReqComponent } from './procurement-req/procurement-req.component';
import { ProcurementQuotationUploadComponent } from './procurement-quotation-upload/procurement-quotation-upload.component';
import { ProcurementApprovalComponent } from './procurement-approval/procurement-approval.component';
import { SharedPModule } from '../sharedP.module';


@NgModule({
  declarations: [ProcurementReqComponent, ProcurementQuotationUploadComponent, ProcurementApprovalComponent],
  imports: [
    CommonModule,
    ProcurementRoutingModule,
    TabViewModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    DialogModule,
    FileUploadModule,
    SharedPModule
  ]
})
export class ProcurementModule { }
