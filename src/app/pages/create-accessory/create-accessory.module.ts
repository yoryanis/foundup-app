import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { CreateAccessoryComponent } from './create-accessory.component';
import { CreateAccessoryRoutingModule } from './create-accessory-routing.module';

@NgModule({
  declarations: [CreateAccessoryComponent],
  imports: [CommonModule, ComponentsModule, CreateAccessoryRoutingModule],
})
export class CreateAccessoryModule {}
