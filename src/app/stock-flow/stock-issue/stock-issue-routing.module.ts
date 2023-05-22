import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockIssueComponent } from './stock-issue.component';

const routes: Routes = [{ path: '', component: StockIssueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockIssueRoutingModule { }
