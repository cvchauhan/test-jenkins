import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherEntryRoutingModule } from './voucher-entry-routing.module';
import { VoucherEntryComponent } from './voucher-entry.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { SharedPModule } from 'src/app/sharedP.module';


@NgModule({
  declarations: [VoucherEntryComponent],
  imports: [
    CommonModule,
    VoucherEntryRoutingModule,
    MapCommonModule,
    SharedPModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VoucherEntryModule { }
