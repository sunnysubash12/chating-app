import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), importProvidersFrom(HttpClientModule,CommonModule,TranslateModule.forRoot())],
};
