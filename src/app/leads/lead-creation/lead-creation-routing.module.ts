import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadCreationComponent } from './lead-creation.component';

const routes: Routes = [{ path: '', component: LeadCreationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadCreationRoutingModule { }
