import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AirQualityIcons, AirQualityIndex } from 'src/app/shared/model/enum/air-quality';
import { StateCapitals } from 'src/app/shared/model/enum/state-capitals';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { ModalComponent } from '../modal/modal.component';

type WeatherCodes = {
  thunderstorm: number[];
  water_drop: number[];
  umbrella: number[];
  snowing: number[];
  cyclone: number[];
  sunny: number[];
  cloud: number[];
};

type WeatherData = {
  icon: string;
  name: string;
  temp: string;
  tempMin: string;
  tempMax: string;
};

type AirPollutionData = {
  icon: string;
  airQuality: string;
  co: string;
  fineParticles: string;
};

type ForecastData = {
  time: string;
  temp: string;
  tempMax: string;
  tempMin: string;
};

@Component({
  selector: 'app-usa-capitals-weather',
  templateUrl: './usa-capitals-weather.component.html',
  styleUrls: ['./usa-capitals-weather.component.scss']
})
export class UsaCapitalsWeatherComponent implements OnInit {

    showCards = false;
    capitals: string[] = [];
    forecasts: ForecastData[] = [];
    selectedCapital =  new FormControl<string | number>(-1, {
      nonNullable: false,
      validators: [
        Validators.required,
        (control: AbstractControl) => this.validSelection(control)
      ]
    });
    weatherData = {} as WeatherData;
    airPollutionData = {} as AirPollutionData;
    weather: WeatherCodes = {
      thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
      water_drop: [300, 301, 302, 310, 311, 312, 313, 314, 321],
      umbrella: [500, 501, 502, 503, 504, 520, 521, 522, 531],
      snowing: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
      cyclone: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
      sunny: [800],
      cloud: [801, 802, 803, 804]
    };
    toCelcius = - 273.15;
    errorAPI = false;
    constructor(
      private matDialog: MatDialog,
      private weatherService: WeatherService
    ) {
    }

    ngOnInit(): void {
      this.capitals = Object.values(StateCapitals).sort((a, b) => a.localeCompare(b));
    }

    getData(): void {
      if(this.selectedCapital.valid){
        this.matDialog.open(ModalComponent);
        const forecast$ = this.weatherService.getForecast(this.selectedCapital.value as string);
        const weather$ = this.weatherService.getWeather(this.selectedCapital.value as string);
        
        if(forecast$ && weather$) {
          forkJoin<any[]>([forecast$, weather$]).subscribe({
            next: (values: any[]) => {
              const latitude = values[0].city.coord.lat.toString();
              const longitude = values[0].city.coord.lon.toString();
              console.log(latitude, longitude);
              this.weatherData.name = values[1].weather[0].main;
              this.weatherData.temp = this.transformToCelcius(values[1].main.temp);
              this.weatherData.tempMin = this.transformToCelcius(values[1].main.temp_min);
              this.weatherData.tempMax = this.transformToCelcius(values[1].main.temp_max);
  
              Object.keys(this.weather).some((key: string) => {
                if (this.weather[key as keyof WeatherCodes].some((element: number) => element === values[1].weather[0].id)) {
                  this.weatherData.icon = key;
                  return true;
                }
                return false;
              });
  
              this.forecasts = [];
              const temporalForecast = values[0].list.map((temp: any) => temp.main)
                .map(({feels_like, grnd_level, humidity, pressure, sea_level, temp_kf, ...rest}: any) => rest);
              const timeArray = values[0].list.map((temp: any) => temp.dt_txt);
              temporalForecast.forEach((element: any, index: number) => {
                this.forecasts.push({
                  time: timeArray[index],
                  temp: this.transformToCelcius(element.temp),
                  tempMax: this.transformToCelcius(element.temp_max),
                  tempMin: this.transformToCelcius(element.temp_min)
                });
              });
  
              this.getAirPollutionData(latitude, longitude)
            },
            error: (error) => {
              this.matDialog.closeAll();
              this.errorAPI = true;
              console.error(error);
            }
          });
        } else {
          this.matDialog.closeAll();
          this.errorAPI = true;
          console.error('Forecast or weather method returned undefined or null');
        }
      }
    }

    transformToCelcius(temperature: number): string {
      return (temperature + this.toCelcius).toFixed(2) + '°C';
    }

    airQualityOption(isIcon: boolean, index: number): string {
      let selectedKey = ''; 
      Object.entries((isIcon ? AirQualityIcons : AirQualityIndex)).some(([key, value]) => {
        if(value === index){
          selectedKey = key;
          return true;
        }
        return false;
      });
      return selectedKey;
    }

    getAirPollutionData(latitude: string, longitude: string): void {
      const airPollution$ = this.weatherService.getAirPollution(latitude, longitude);
      if(airPollution$){
        airPollution$.subscribe({
          next: (data) => {
            this.airPollutionData.icon = this.airQualityOption(true, data.list[0].main.aqi);
            this.airPollutionData.airQuality = this.airQualityOption(false, data.list[0].main.aqi);
            this.airPollutionData.co = data.list[0].components.co + ' ' + 'μg/m';
            this.airPollutionData.fineParticles = data.list[0].components.pm2_5 + ' ' + 'μg/m';
            console.log(data);
            this.showCards = true;
            this.matDialog.closeAll();
          },
          error: (error) => {
            this.matDialog.closeAll();
            this.errorAPI = true;
            console.error(error);
          }
        });
      } else {
        this.matDialog.closeAll();
        this.errorAPI = true;
        console.error('Air pollution method returned undefined or null');
      }
    }

    validSelection(control: AbstractControl): ValidationErrors | null {
      return control.value <= 0 && control.value !== null ? {errorValue: true} : null;
    }
}
