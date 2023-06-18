import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './components/modal/modal.component';
import { UsaCapitalsWeatherComponent } from './components/usa-capitals-weather/usa-capitals-weather.component';
import { UsaCapitalsWeatherRoutingModule } from './usa-capitals-weather-routing.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    UsaCapitalsWeatherComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    // TranslateModule,
    // ReactiveFormsModule,
    // OverlayModule,
    // MatProgressSpinnerModule,
    // MatDialogModule,
    SharedModule,
    UsaCapitalsWeatherRoutingModule
  ]
})
export class UsaCapitalsWeatherModule { }
