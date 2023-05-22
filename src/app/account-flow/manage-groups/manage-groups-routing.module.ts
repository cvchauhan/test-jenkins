import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageGroupsComponent } from './manage-groups.component';

const routes: Routes = [{ path: '', component: ManageGroupsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageGroupsRoutingModule { }
