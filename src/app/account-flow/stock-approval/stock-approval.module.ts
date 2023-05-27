import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { StockApprovalRoutingModule } from './stock-approval-routing.module';
import { StockApprovalComponent } from './stock-approval.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedPModule } from 'src/app/sharedP.module';

@NgModule({
  declarations: [StockApprovalComponent],
  imports: [
    MapCommonModule,
    StockApprovalRoutingModule,
    ToastModule,
    CheckboxModule,
    SharedPModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StockApprovalModule { }
