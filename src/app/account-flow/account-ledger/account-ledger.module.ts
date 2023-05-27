import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccountLedgerRoutingModule } from './account-ledger-routing.module';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { AccountLedgerComponent } from './account-ledger.component';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [AccountLedgerComponent],
  imports: [
    AccountLedgerRoutingModule,
    MapCommonModule,
    TabViewModule,
    AutoCompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountLedgerModule {}
