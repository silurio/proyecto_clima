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

  /**
   * Gets the forecast of the speciified city 
   * @param city refers to the city for which the forecast will be requested
   * @returns the Open Weather Map API response
   */
  getForecast(city: string): Observable<any> {
    const url = `${this.FORECAST_URL}&q=${city}`;
    return this.http.get(url);
  }

  /**
   * Gets the weather info of the speciified city 
   * @param city refers to the city for which the weather will be requested
   * @returns the Open Weather Map API response
   */
  getWeather(city: string): Observable<any> {
    const url = `${this.WEATHER_URL}&q=${city}`;
    return this.http.get(url);
  }

  /**
   * Gets the air pollution info of the speciified coordinates 
   * @param latitude 
   * @param longitude 
   * @returns the Open Weather Map API response
   */
  getAirPollution(latitude: string, longitude: string): Observable<any> {
    const url = `${this.AIR_POLLUTION_URL}lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}`;
    return this.http.get(url);
  }
}
