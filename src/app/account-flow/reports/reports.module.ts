import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsInnerComponent } from './reports-inner/reports-inner.component';
import { ReportsComponent } from './reports.component';
import { CardModule } from 'primeng/card';
import { MapCommonModule } from 'src/app/map-common/map-common.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ReportsComponent,
    ReportsInnerComponent
  ],
  imports: [    
    ReportsRoutingModule,
    CardModule,
    MapCommonModule,
    PdfViewerModule
  ]
})
export class ReportsModule { }
