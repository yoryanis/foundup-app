import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { EditAccessoryComponent } from './edit-accessory.component';
import { EditAccessoryRoutingModule } from './edit-accessory-routing.module';

@NgModule({
  declarations: [EditAccessoryComponent],
  imports: [CommonModule, ComponentsModule, EditAccessoryRoutingModule],
})
export class EditAccessoryModule {}
