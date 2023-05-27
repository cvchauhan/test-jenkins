import { NgModule } from '@angular/core';
import { ManageGroupsRoutingModule } from './manage-groups-routing.module';
import { ManageGroupsComponent } from './manage-groups.component';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [ManageGroupsComponent],
  imports: [    
    ManageGroupsRoutingModule,
    MapCommonModule,
    ToastModule
  ]
})
export class ManageGroupsModule { }
