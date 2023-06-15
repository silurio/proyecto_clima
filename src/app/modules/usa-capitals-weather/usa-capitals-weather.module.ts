import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsaCapitalsWeatherRoutingModule } from './usa-capitals-weather-routing.module';
import { UsaCapitalsWeatherComponent } from './components/usa-capitals-weather/usa-capitals-weather.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UsaCapitalsWeatherComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    UsaCapitalsWeatherRoutingModule
  ]
})
export class UsaCapitalsWeatherModule { }
