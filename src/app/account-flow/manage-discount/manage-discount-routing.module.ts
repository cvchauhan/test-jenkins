import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDiscountComponent } from './manage-discount.component';

const routes: Routes = [{ path: '', component: ManageDiscountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageDiscountRoutingModule {}
