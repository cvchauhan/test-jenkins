import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CollectionApprovalRoutingModule } from './collection-approval-routing.module';
import { MapCommonModule } from '../../map-common/map-common.module';
import { CollectionApprovalComponent } from './collection-approval.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedPModule } from 'src/app/sharedP.module';

@NgModule({
  declarations: [CollectionApprovalComponent],
  imports: [
    CollectionApprovalRoutingModule,
    MapCommonModule,
    FullCalendarModule,
    SharedPModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CollectionApprovalModule {}
