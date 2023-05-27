import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { HrFlowRoutingModule } from './hr-flow-routing.module';
import { DesignationComponent } from './designation/designation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayheadsComponent } from './payheads/payheads.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { SalaryStructureComponent } from './salary-structure/salary-structure.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HrService } from './hr.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NumberDirective } from './employee/numbers-only.directive';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { GenerateSalaryComponent } from './generate-salary/generate-salary.component';
import { UserDefinedPayheadComponent } from './user-defined-payhead/user-defined-payhead.component';
import { EmployeeTrackingComponent } from './employee-tracking/employee-tracking.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { SharedPModule } from '../sharedP.module';
import { ManageShiftComponent } from './manage-shift/manage-shift.component';
import { ManageEmployeeShiftComponent } from './manage-employee-shift/manage-employee-shift.component';
import { SalaryStructureDetailsComponent } from './salary-structure-details/salary-structure-details.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { MapCommonModule } from '../map-common/map-common.module';

@NgModule({
  declarations: [DesignationComponent, PayheadsComponent,

    SalaryProcessComponent, 
    SalaryStructureComponent,
    NumberDirective,
    GenerateSalaryComponent,
    UserDefinedPayheadComponent,
    EmployeeTrackingComponent,
    ManageShiftComponent,
    ManageEmployeeShiftComponent,
    SalaryStructureDetailsComponent,
    EmployeeAttendanceComponent
  ],
  imports: [
    MapCommonModule,
    AutoCompleteModule,    
    HrFlowRoutingModule,    
    SelectButtonModule,            
    RadioButtonModule,         
    TabViewModule,      
    FileUploadModule,        
    CheckboxModule,    
    ToastModule,
    MultiSelectModule,
    AccordionModule,
    ChipsModule,
    SharedPModule
  ],
  providers: [HrService, MessageService, ConfirmationService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HrFlowModule { }
