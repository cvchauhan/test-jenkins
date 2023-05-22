import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ManageJobComponent } from './manage-job/manage-job.component';
import { ServicesRoutingModule } from './services-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButton } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { JobComponent } from './job/job.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ServicesService } from './services.service';
import { JobAssignmentComponent } from './job-assignment/job-assignment.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ManageHolidayComponent } from './manage-holiday/manage-holiday.component';
import { ManageHolidayJobComponent } from './manage-holiday-job/manage-holiday-job.component';
import { JobApprovalComponent } from './job-approval/job-approval.component';

import { MessagesModule } from 'primeng/messages';
import { AccountService } from '../account-flow/account.service';
import { DiscCalcPipe } from '../pipes/discCalcPipe';
import { CustomerLedgerComponent } from '../services/customer-ledger/customer-ledger.component';
import { InternalJobComponent } from './internal-job/internal-job.component';
import { EditJobComponent } from './internal-job/edit-job/edit-job.component';
// import { MapComponent } from '../map/map.component';
// import { AgmCoreModule } from '@agm/core';
import { SharedPModule } from '../sharedP.module';
import { MapCommonModule } from '../map-common/map-common.module';
import { JobViewComponent } from './job-view/job-view.component';
import { CardModule } from 'primeng/card';
import { JobClosureApprovalComponent } from './job-closure-approval/job-closure-approval.component';
import { JobClosureComponent } from './job-closure/job-closure.component';
import { TooltipModule } from 'primeng/tooltip';
import { FullCalendarComponent } from './job-assignment/full-calendar/full-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarModule } from 'primeng/calendar';
import { AssignMapComponent } from './job-assignment/assign-map/assign-map.component';
import { AgmCoreModule } from '@agm/core';
import { JobRunningSheetComponent } from './job-running-sheet/job-running-sheet.component';
import { JobRenewalComponent } from './job-renewal/job-renewal.component';
import { JobAssignmentInternalComponent } from './job-assignment-internal/job-assignment-internal.component';
import { AddUpdateManageJobComponent } from './add-update-manage-job/add-update-manage-job.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { JobViewCustomerLedgerComponent } from './job-view-customer-ledger/job-view-customer-ledger.component';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    ManageJobComponent,
    JobComponent,
    AmbulanceComponent,
    JobAssignmentComponent,
    ManageHolidayComponent,
    ManageHolidayJobComponent,
    JobApprovalComponent,
    DiscCalcPipe,
    CustomerLedgerComponent,
    InternalJobComponent,
    EditJobComponent,
    JobViewComponent,
    JobClosureApprovalComponent,
    JobClosureComponent,
    FullCalendarComponent,
    AssignMapComponent,
    JobRunningSheetComponent,
    JobRenewalComponent,
    JobAssignmentInternalComponent,
    AddUpdateManageJobComponent,
    AddCustomerComponent,
    AddPatientComponent,
    JobViewCustomerLedgerComponent,
  ],
  imports: [
    ServicesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule,
    FileUploadModule,
    TableModule,
    CalendarModule,
    InputNumberModule,
    RadioButtonModule,
    MultiSelectModule,
    CheckboxModule,
    ConfirmDialogModule,
    SharedPModule,
    MapCommonModule,
    CardModule,
    TooltipModule,
    FullCalendarModule,
    DynamicDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBw7NGxmy1v8NBF5CN-a1ub5VdYa6Td0Vk',
      libraries: ['places'],
      apiVersion: 'quarterly',
    }),
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
  ],
  providers: [
    ServicesService,
    MessageService,
    ConfirmationService,
    AccountService,
    DialogService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AddCustomerComponent,
    AddPatientComponent,
    AddUpdateManageJobComponent,
    JobViewCustomerLedgerComponent,
  ],
})
export class ServicesModule {}
