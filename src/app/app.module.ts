import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HeaderComponent } from './header/header.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { LoaderComponent } from './loader/loader/loader.component';
import { LoaderService } from './loader/loaderservices/loader.service';
import { LoaderInterceptorService } from './loader/interceptors/loader-interceptor.service';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BranchService } from './branch.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AgmCoreModule } from '@agm/core';
import { OutsideDirective } from './header/outside.directive';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    SidebarComponent,
    OutsideDirective,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    MegaMenuModule,
    MenuModule,
    ReactiveFormsModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    FormsModule,
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
