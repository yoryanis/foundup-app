import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccessoryComponent } from './edit-accessory.component';

const routes: Routes = [
  {
    path: '',
    component: EditAccessoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccessoryRoutingModule {}
