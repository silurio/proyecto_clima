import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsaCapitalsWeatherRoutes } from './routing/usa-capitals-weather-routes';
import { UsaCapitalsWeatherComponent } from './components/usa-capitals-weather/usa-capitals-weather.component';

const routes: Routes = [
  {
    path: UsaCapitalsWeatherRoutes.weather,
    component: UsaCapitalsWeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsaCapitalsWeatherRoutingModule { }
