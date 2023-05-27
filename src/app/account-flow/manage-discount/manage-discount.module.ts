import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDiscountRoutingModule } from './manage-discount-routing.module';
import { ManageDiscountComponent } from './manage-discount.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    ManageDiscountComponent
  ],
  imports: [
    CommonModule, 
    ManageDiscountRoutingModule,
    MapCommonModule,
    MultiSelectModule
  ],
})
export class ManageDiscountModule {}
