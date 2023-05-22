import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCaegoryComponent } from './profile-caegory/profile-caegory.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {path:'manage-Parameters', component:ProfileCaegoryComponent},
  {path: 'manage-permissions', component:RoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
