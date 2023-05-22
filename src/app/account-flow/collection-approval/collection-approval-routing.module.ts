import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionApprovalComponent } from './collection-approval.component';

const routes: Routes = [{ path: '', component: CollectionApprovalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionApprovalRoutingModule {}
