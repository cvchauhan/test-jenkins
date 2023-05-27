import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxDetailsRoutingModule } from './tax-details-routing.module';
import { TaxDetailsComponent } from './tax-details.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputDisabledDirective } from '../InputDisabledDirective';
import { SharedPModule } from 'src/app/sharedP.module';


@NgModule({
  declarations: [TaxDetailsComponent, InputDisabledDirective],
  imports: [
    TaxDetailsRoutingModule,
    MapCommonModule,
    AutoCompleteModule,
    ToastModule,
    InputTextareaModule,
    SharedPModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaxDetailsModule { }
