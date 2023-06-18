import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsaCapitalsWeatherRoutes } from 'src/app/modules/usa-capitals-weather/routing/usa-capitals-weather-routes';
import { AppModules } from 'src/app/routing/app-modules';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

    constructor(
      private router: Router
    ) { }

    goToUsaCapitalsWeather(): void {
      this.router.navigate([AppModules.usaCapitalsWeather + UsaCapitalsWeatherRoutes.weather]);
    }

    goToHome(): void {
      this.router.navigate(['']);
    }
}
