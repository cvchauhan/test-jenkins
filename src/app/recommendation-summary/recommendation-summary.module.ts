import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule} from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputNumberModule } from 'primeng/inputNumber';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { RecommendationSummaryRoutingModule } from './recommendation-summary-routing.module';
import { RecommendationSummaryComponent } from './recommendation-summary/recommendation-summary.component';
import { AssessmentDataComponent } from './steps/assessment-data/assessment-data.component';
import { RecommendationSkillsComponent } from './steps/recommendation-skills/recommendation-skills.component';
import {StepsModule} from 'primeng/steps';
import { RecommendationSummaryServicepointsComponent } from './recommendation-summary-servicepoints/recommendation-summary-servicepoints.component';
import { StepsComponent } from './steps/steps.component';
import { MedicineComponent } from './steps/medicine/medicine.component';
import { StepsummaryComponent } from './steps/stepsummary/stepsummary.component';
import { RecommendationService } from './recommendation.service';



@NgModule({
  declarations: [RecommendationSummaryComponent, AssessmentDataComponent, RecommendationSkillsComponent, RecommendationSummaryServicepointsComponent, StepsComponent, MedicineComponent, StepsummaryComponent],
  imports: [
    CommonModule,
    RecommendationSummaryRoutingModule,
    TabViewModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    FormsModule,
    DialogModule,
    ToastModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MessagesModule,
    RadioButtonModule,
    CheckboxModule,
    SplitButtonModule,
    InputNumberModule,
    FileUploadModule,
    HttpClientModule,
    StepsModule,


  ],
  providers:[RecommendationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class RecommendationSummaryModule { }
