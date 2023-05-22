import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementApprovalComponent } from './procurement-approval/procurement-approval.component';
import { ProcurementQuotationUploadComponent } from './procurement-quotation-upload/procurement-quotation-upload.component';
import { ProcurementReqComponent } from './procurement-req/procurement-req.component';

const routes: Routes = [
  {path:'procurement-request', component:ProcurementReqComponent},
  {path:'procurement-quotation-upload', component:ProcurementQuotationUploadComponent},
  {path:'procurement-approval', component:ProcurementApprovalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementRoutingModule { }
