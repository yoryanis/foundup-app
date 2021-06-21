import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'preview/:id_unique',
    loadChildren: () =>
      import('./pages/preview/preview.module').then((m) => m.PreviewModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-user',
    loadChildren: () =>
      import('./pages/edit-user/edit-user.module').then(
        (m) => m.EditUserModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'create/element',
    loadChildren: () =>
      import('./pages/create-accessory/create-accessory.module').then(
        (m) => m.CreateAccessoryModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/element/:id_unique',
    loadChildren: () =>
      import('./pages/edit-accessory/edit-accessory.module').then(
        (m) => m.EditAccessoryModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        (m) => m.NotificationsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
