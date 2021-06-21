import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ModalFoundComponent } from './modal-found/modal-found.component';

@NgModule({
  declarations: [HomeComponent, ModalFoundComponent],
  imports: [CommonModule, ComponentsModule, HomeRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
