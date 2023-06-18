// import { TestBed } from '@angular/core/testing';

// import { WeatherService } from './weather.service';

// describe('WeatherService', () => {
//   let service: WeatherService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(WeatherService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let weatherService: WeatherService;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    weatherService = new WeatherService(httpClient);
  });

  it('should retrieve forecast data', () => {
    const city = 'Albany';
    const forecastData = jasmine.anything();
    const expectedUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${weatherService['API_KEY']}&q=${city}`;
    
    httpClient.get.and.returnValue(of(forecastData));

    weatherService.getForecast(city).subscribe(data => {
      expect(data).toEqual(forecastData);
      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  it('should retrieve weather data', () => {
    const city = 'Albany';
    const weatherData = jasmine.anything();
    const expectedUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${weatherService['API_KEY']}&q=${city}`;

    httpClient.get.and.returnValue(of(weatherData));

    weatherService.getWeather(city).subscribe(data => {
      expect(data).toEqual(weatherData);
      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  it('should retrieve air pollution data', () => {
    const latitude = '42.6001';
    const longitude = '-73.9662';
    const airPollutionData = jasmine.anything();
    const expectedUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${weatherService['API_KEY']}`;

    httpClient.get.and.returnValue(of(airPollutionData));

    weatherService.getAirPollution(latitude, longitude).subscribe(data => {
      expect(data).toEqual(airPollutionData);
      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
