import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ManageJobRoutingModule } from './manage-job-routing.module';
import { ManageJobComponent } from './manage-job.component';
import { MapCommonModule } from '../../map-common/map-common.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { SharedPModule } from '../../sharedP.module';

@NgModule({
  declarations: [ManageJobComponent],
  imports: [
    ManageJobRoutingModule,
    AutoCompleteModule,
    ToastModule,
    MapCommonModule,
    SharedPModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageJobModule { }
