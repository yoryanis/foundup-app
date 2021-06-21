import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAccessoryComponent } from './create-accessory.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAccessoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAccessoryRoutingModule {}
