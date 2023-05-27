import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCommonComponent } from './map-common/map-common.component';
import { MapComponent } from '../map/map.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [MapCommonComponent,MapComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    MapCommonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBw7NGxmy1v8NBF5CN-a1ub5VdYa6Td0Vk',
      libraries: ['places'],
      apiVersion: 'quarterly'
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapCommonModule { }
