import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCaegoryComponent } from './profile-caegory/profile-caegory.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import { RoleComponent } from './role/role.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { ProfileService } from './profile.service';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import {CheckboxModule} from 'primeng/checkbox';
import { SharedPModule } from '../sharedP.module';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [ProfileCaegoryComponent, RoleComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule,
    CheckboxModule,
    SharedPModule,
    TabViewModule
  ],
  providers:[ProfileService,MessageService,ConfirmationService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
