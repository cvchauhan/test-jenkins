import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ambulance-assignment',
    loadChildren: () =>
      import('./ambulance-assignment/ambulance-assignment.module').then(
        (m) => m.AmbulanceAssignmentModule
      ),
  },
  {
    path: 'lead',
    loadChildren: () =>
      import('./leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: 'lead-creation',
    loadChildren: () =>
      import('./lead-creation/lead-creation.module').then(
        (m) => m.LeadCreationModule
      ),
  },
  {
    path: 'vehicle-availability',
    loadChildren: () =>
      import('./vehicle-availability/vehicle-availability.module').then(
        (m) => m.VehicleAvailabilityModule
      ),
  },
  {
    path: 'vehicle-entry',
    loadChildren: () =>
      import('./vehicle-entry/vehicle-entry.module').then(
        (m) => m.VehicleEntryModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadsRoutingModules {}
