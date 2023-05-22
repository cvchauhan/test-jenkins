import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'service-skills-pricing',
    loadChildren: () =>
      import('./service-skills-pricing/service-skills-pricing.module').then(
        (m) => m.ServiceSkillsPricingModule
      ),
  },
  {
    path: 'service-point',
    loadChildren: () =>
      import('./service-points/service-points.module').then(
        (m) => m.ServicePointsModule
      ),
  },
  {
    path: 'service-point-care-plan',
    loadChildren: () =>
      import('./service-point-care-plan/service-point-care-plan.module').then(
        (m) => m.ServicePointCarePlanModule
      ),
  },
  {
    path: 'vehicle-entry',
    loadChildren: () =>
      import('./vehicle-entry/vehicle-entry.module').then(
        (m) => m.VehicleEntryModule
      ),
  },
  {
    path: 'vehicle-pricing',
    loadChildren: () =>
      import('./vehicle-pricing/vehicle-pricing.module').then(
        (m) => m.VehiclePricingModule
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
    path: 'service-skills-pricing-unit',
    loadChildren: () =>
      import(
        './service-skills-pricing-unit/service-skills-pricing-unit.module'
      ).then((m) => m.ServiceSkillsPricingUnitModule),
  },
  {
    path: 'service-point-pricing',
    loadChildren: () =>
      import('./service-point-pricing/service-point-pricing.module').then(
        (m) => m.ServicePointPricingModule
      ),
  },
  {
    path: 'service-package',
    loadChildren: () =>
      import('./package-table/package-table.module').then(
        (m) => m.PackageTableModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
