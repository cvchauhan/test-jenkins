import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemPickupComponent } from './item-pickup.component';

const routes: Routes = [{ path: '', component: ItemPickupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemPickupRoutingModule { }
