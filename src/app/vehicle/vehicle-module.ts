import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TransportPointComponent } from './transport-point/transport-point.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { VehicleService } from './vehicle.service';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { AgmCoreModule } from '@agm/core';
import { MapCommonModule } from '../map-common/map-common.module';
import { ServicesModule } from '../services/services.module';



  
@NgModule({
  declarations: [TransportPointComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    VehicleRoutingModule,
    CalendarModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    PaginatorModule,
    MapCommonModule,
    ServicesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBw7NGxmy1v8NBF5CN-a1ub5VdYa6Td0Vk',
      libraries: ['places'],
      apiVersion: 'quarterly'
    }),
  ],
  providers: [ MessageService, ConfirmationService, DialogService,VehicleService],
})
export class VehicleModule {}
