import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccountFlowRoutingModule } from './account-flow-routing.module';
import { AccountService } from './account.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    AccountFlowRoutingModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AccountService, MessageService, ConfirmationService],
})
export class AccountFlowModule {}
