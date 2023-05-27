import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageLedgerRoutingModule } from './manage-ledger-routing.module';
import { ManageLedgerComponent } from './manage-ledger.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [ManageLedgerComponent],
  imports: [
    CommonModule,
    ManageLedgerRoutingModule,
    MapCommonModule,
    AutoCompleteModule,
    CheckboxModule,
    MultiSelectModule,
    TabViewModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageLedgerModule { }
