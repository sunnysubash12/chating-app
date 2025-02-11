import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Import this
import { NoopAnimationsModule } from '@angular/platform-browser/animations';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), importProvidersFrom(NoopAnimationsModule,BrowserAnimationsModule,ReactiveFormsModule,HttpClientModule,CommonModule,TranslateModule.forRoot())],
};
