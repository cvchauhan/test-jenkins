import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service/service.component';
import { ServiceSkillsPricingComponent } from './service-skills-pricing/service-skills-pricing.component';
import { ServicePointsComponent } from './service-points/service-points.component';
import { VehicleEntryComponent } from './vehicle-entry/vehicle-entry.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ServicePointCarePlanComponent } from './service-point-care-plan/service-point-care-plan.component';
import { VehiclePricingComponent } from './vehicle-pricing/vehicle-pricing.component';
import { VehicleAvailabilityComponent } from './vehicle-availability/vehicle-availability.component';
import { ServiceDesignService } from './service-design.service';
import { ConfirmationService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ServicePipe } from '../service/service.pipe';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ServiceSkillsPricingUnitComponent } from './service-skills-pricing-unit/service-skills-pricing-unit.component';
import { ServicePointPricingComponent } from './service-point-pricing/service-point-pricing.component';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { SharedPModule } from '../sharedP.module';
import { ServicePackageComponent } from './service-package/service-package.component';
import { PackageTableComponent } from './package-table/package-table.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MapCommonModule } from '../map-common/map-common.module';

@NgModule({
  declarations: [
    ServiceComponent,
    ServiceSkillsPricingComponent,
    ServicePointsComponent,
    VehicleEntryComponent,
    ServicePointCarePlanComponent,
    VehiclePricingComponent,
    VehicleAvailabilityComponent,
    ServicePipe,
    ServiceSkillsPricingUnitComponent,
    ServicePointPricingComponent,
    ServicePackageComponent,
    PackageTableComponent,
  ],
  imports: [
    MapCommonModule,    
    ServiceRoutingModule,
    TabViewModule,
    MultiSelectModule,
    ToastModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    SplitButtonModule,
    InputNumberModule,
    FileUploadModule,
    HttpClientModule,
    AccordionModule,
    SelectButtonModule,
    ChipModule,
    SharedPModule,
    DynamicDialogModule,
  ],
  providers: [ServiceDesignService, ConfirmationService, DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //   entryComponents: [
  //     ServicePackageComponent
  //  ]
})
export class ServiceModule {}
