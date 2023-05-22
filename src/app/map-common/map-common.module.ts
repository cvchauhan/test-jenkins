import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapCommonComponent } from './map-common/map-common.component';
import { MapComponent } from '../map/map.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [MapCommonComponent,MapComponent],
  exports: [MapCommonComponent],
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
  ]
})
export class MapCommonModule { }
