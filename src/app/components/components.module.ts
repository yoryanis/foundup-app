import { BlockUIModule } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmptyComponent } from './empty/empty.component';
import { FooterComponent } from './footer/footer.component';
import { ModalMapComponent } from './modal-map/modal-map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLoggedOutComponent } from './navbar-logged-out/navbar-logged-out.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
import { PipesModule } from '../services/pipes/pipes.module';
import { UpToDateComponent } from './up-to-date/up-to-date.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ModalUploadEvidenceComponent } from './modal-upload-evidence/modal-upload-evidence.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    EmptyComponent,
    FooterComponent,
    ModalMapComponent,
    NavbarComponent,
    NavbarLoggedOutComponent,
    NavbarMainComponent,
    UpToDateComponent,
    UserInfoComponent,
    ModalUploadEvidenceComponent,
    SearchComponent,
  ],
  imports: [
    BlockUIModule.forRoot(),
    CommonModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    PipesModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    BlockUIModule,
    EmptyComponent,
    FooterComponent,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    NavbarComponent,
    NavbarLoggedOutComponent,
    NavbarMainComponent,
    PipesModule,
    ReactiveFormsModule,
    SearchComponent,
    UpToDateComponent,
    UserInfoComponent,
  ],
})
export class ComponentsModule {}
