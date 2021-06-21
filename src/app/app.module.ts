import localeEsCo from '@angular/common/locales/es-CO';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { environment } from '../environments/environment';
import { PreviewComponent } from './pages/preview/preview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthService } from './services';
import { RequestInterceptor } from './services/interceptors/request.interceptor';

registerLocaleData(localeEsCo, 'es-Co');

@NgModule({
  declarations: [AppComponent, PreviewComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    ToastrModule.forRoot({ preventDuplicates: true, progressBar: true }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Co' },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
