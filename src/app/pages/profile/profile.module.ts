import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ComponentsModule } from 'src/app/components/components.module';
import { ModalDeleteAccessoryComponent } from './components/modal-delete-accessory/modal-delete-accessory.component';
import { NoReportsComponent } from './components/no-reports/no-reports.component';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    NoReportsComponent,
    ProfileComponent,
    ReportsComponent,
    ModalDeleteAccessoryComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ProfileRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
