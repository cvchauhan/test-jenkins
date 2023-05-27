import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AmbulanceAssignmentComponent } from './ambulance-assignment/ambulance-assignment.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadCreationComponent } from './lead-creation/lead-creation.component';
import { VehicleAvailabilityComponent } from './vehicle-availability/vehicle-availability.component';
import { VehicleEntryComponent } from './vehicle-entry/vehicle-entry.component';
import { LeadsRoutingModules } from './leads-routing.module';
import { MapCommonModule } from '../map-common/map-common.module';

@NgModule({
  declarations: [AmbulanceAssignmentComponent, LeadsComponent, LeadCreationComponent, VehicleAvailabilityComponent, VehicleEntryComponent],
  imports: [
    LeadsRoutingModules,
    TabViewModule,
    AutoCompleteModule,
    FileUploadModule,
    MapCommonModule
  ],
})
export class LeadsModule { }
