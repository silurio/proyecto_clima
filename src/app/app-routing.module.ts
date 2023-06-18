import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModules } from './routing/app-modules';

const routes: Routes = [
  {
    path: AppModules.usaCapitalsWeather,
    loadChildren: () => import('./modules/usa-capitals-weather/usa-capitals-weather.module').then(m => m.UsaCapitalsWeatherModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
