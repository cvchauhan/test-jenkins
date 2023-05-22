import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { EmployeeRoutingModule } from './employee-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { EmployeeService } from './employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpSearchComponent } from './search/emp-search.component';
import { AccessInfoComponent } from './access-info/access-info.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { KycComponent } from './kyc/kyc.component';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { EmployeeComponent } from './employee.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmpSearchComponent,
    AccessInfoComponent,
    KycComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    FormsModule,
    EmployeeRoutingModule,
    TabViewModule,
    DropdownModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
    ToastModule,
    MultiSelectModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule
  ],
  exports: [],
  providers: [EmployeeService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
