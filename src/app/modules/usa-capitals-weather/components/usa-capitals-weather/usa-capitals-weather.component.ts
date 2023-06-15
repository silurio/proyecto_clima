import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StateCapitals } from 'src/app/shared/model/enum/state-capitals';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-usa-capitals-weather',
  templateUrl: './usa-capitals-weather.component.html',
  styleUrls: ['./usa-capitals-weather.component.scss']
})
export class UsaCapitalsWeatherComponent implements OnInit {

    capitals: string[] = [];
    capitalSeleccionada =  new FormControl<string | null>(null, {
      nonNullable: false,
      validators: Validators.required
    });
    constructor(
      private weatherService: WeatherService
    ) {
    }

    ngOnInit(): void {
      this.capitalSeleccionada.valueChanges.subscribe(value => console.log(value));
      Object.values(StateCapitals).forEach((capital: string) => this.capitals.push(capital));
    }

    getData(): void {
      if(this.capitalSeleccionada.valid){
        this.weatherService.getForecast(this.capitalSeleccionada.value as string)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            const latitude = data.city.coord.lat;
            const longitude = data.city.coord.lon;
            if(latitude & longitude){
              this.getAirPollutionData(latitude, longitude)
            }
          },
          error: (error) => {
            console.error(error);
          }
        });
        this.weatherService.getWeather(this.capitalSeleccionada.value as string)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }

    getAirPollutionData(latitude: string, longitude: string): void {
      this.weatherService.getAirPollution(latitude, longitude)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }

}
