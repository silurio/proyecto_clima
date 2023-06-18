import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/module/shared.module';
import { ModalComponent } from './components/modal/modal.component';
import { UsaCapitalsWeatherComponent } from './components/usa-capitals-weather/usa-capitals-weather.component';
import { UsaCapitalsWeatherRoutingModule } from './usa-capitals-weather-routing.module';


@NgModule({
  declarations: [
    ModalComponent,
    UsaCapitalsWeatherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsaCapitalsWeatherRoutingModule
  ],
  exports: [
    ModalComponent
  ]
})
export class UsaCapitalsWeatherModule { }
