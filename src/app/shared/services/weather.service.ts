import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_KEY = environment.apiKey;
  private FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${this.API_KEY}`;
  private WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}`;
  private AIR_POLLUTION_URL = `http://api.openweathermap.org/data/2.5/air_pollution?`;
  constructor(
    private http: HttpClient
  ) { }

  getForecast(city: string): Observable<any> {
    const url = `${this.FORECAST_URL}&q=${city}`;
    return this.http.get(url);
  }

  getWeather(city: string): Observable<any> {
    const url = `${this.WEATHER_URL}&q=${city}`;
    return this.http.get(url);
  }

  getAirPollution(latitude: string, longitude: string): Observable<any> {
    const url = `${this.AIR_POLLUTION_URL}lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}`;
    return this.http.get(url);
  }
}
