import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoReportsComponent } from './components/no-reports/no-reports.component';
import { ProfileComponent } from './profile.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'no-reports', component: NoReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
