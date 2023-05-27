import { NgModule } from '@angular/core';
import { TransportPointComponent } from './transport-point/transport-point.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { VehicleService } from './vehicle.service';
import { PaginatorModule } from 'primeng/paginator';
import { AgmCoreModule } from '@agm/core';
import { MapCommonModule } from '../map-common/map-common.module';

@NgModule({
  declarations: [TransportPointComponent],
  imports: [    
    VehicleRoutingModule,           
    ToastModule,    
    PaginatorModule,
    MapCommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBw7NGxmy1v8NBF5CN-a1ub5VdYa6Td0Vk',
      libraries: ['places'],
      apiVersion: 'quarterly'
    })
  ],
  providers: [ MessageService, ConfirmationService, DialogService,VehicleService],
})
export class VehicleModule {}
