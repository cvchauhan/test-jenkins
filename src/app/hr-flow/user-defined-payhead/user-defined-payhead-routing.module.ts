import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDefinedPayheadComponent } from './user-defined-payhead.component';

const routes: Routes = [{ path: '', component: UserDefinedPayheadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDefinedPayheadRoutingModule { }
