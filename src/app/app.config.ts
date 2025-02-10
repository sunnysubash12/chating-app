import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), importProvidersFrom(ReactiveFormsModule,HttpClientModule,CommonModule,TranslateModule.forRoot())],
};
