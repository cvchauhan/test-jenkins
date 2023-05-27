import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { JobReceiptsRoutingModule } from './job-receipts-routing.module';
import { JobReceiptsComponent } from './job-receipts.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { TabViewModule } from 'primeng/tabview';
import { SharedPModule } from 'src/app/sharedP.module';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [JobReceiptsComponent],
  imports: [
    MapCommonModule, 
    JobReceiptsRoutingModule,
    TabViewModule,
    SharedPModule,
    ToastModule,
    CheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JobReceiptsModule {}
