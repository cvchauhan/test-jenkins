import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { CardModule } from 'primeng/card';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [ReportsComponent, ReportDetailsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CardModule,
    DropdownModule,
    PdfViewerModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
  ],
})
export class ReportsModule {}
