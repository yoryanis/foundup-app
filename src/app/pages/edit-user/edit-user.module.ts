import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    EditUserRoutingModule
  ]
})
export class EditUserModule { }
