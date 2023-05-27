import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HeaderComponent } from './header/header.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { LoaderComponent } from './loader/loader/loader.component';
import { LoaderService } from './loader/loaderservices/loader.service';
import { LoaderInterceptorService } from './loader/interceptors/loader-interceptor.service';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BranchService } from './branch.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { OutsideDirective } from './header/outside.directive';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { MapCommonModule } from './map-common/map-common.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    SidebarComponent,
    OutsideDirective,
  ],
  imports: [
    MapCommonModule,
    BrowserModule,    
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    MegaMenuModule,
    MenuModule,        
    RadioButtonModule,        
    ToastModule,
    ReportViewerModule,
  ],
  providers: [
    LoaderService,
    BranchService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
