import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceSkillsPricingComponent } from './service-skills-pricing.component';

const routes: Routes = [{ path: '', component: ServiceSkillsPricingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSkillsPricingRoutingModule { }
