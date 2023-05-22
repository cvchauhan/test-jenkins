import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { DashoardService } from './dashoard.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PaginatorModule,
    MenuModule,
    ProgressBarModule,
    TableModule,
    RatingModule,
    DropdownModule,
    ChartModule,
  ],
  providers: [DashoardService],
})
export class DashboardModule {}
