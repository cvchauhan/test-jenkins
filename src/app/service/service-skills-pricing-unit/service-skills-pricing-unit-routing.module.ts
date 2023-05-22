import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceSkillsPricingUnitComponent } from './service-skills-pricing-unit.component';

const routes: Routes = [{ path: '', component: ServiceSkillsPricingUnitComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSkillsPricingUnitRoutingModule { }
