import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { UsaCapitalsWeatherComponent } from './usa-capitals-weather.component';

describe('UsaCapitalsWeatherComponent', () => {
  let component: UsaCapitalsWeatherComponent;
  let matDialogMock: jasmine.SpyObj<MatDialog>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(() => {
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getForecast', 'getWeather', 'getAirPollution']);

    component = new UsaCapitalsWeatherComponent(matDialogMock, weatherServiceMock);
  });

  describe('ngOnInit', () => {
    it('should populate the `capitals` array with sorted state capitals', () => {
      component.ngOnInit();

      expect(component.capitals).toEqual([
        'Albany', 'Annapolis', 'Atlanta', 'Augusta', 'Austin', 'Baton Rouge', 'Bismarck', 
        'Boise', 'Boston', 'Carson City', 'Charleston', 'Cheyenne', 'Columbia', 'Columbus', 
        'Concord', 'Denver', 'Des Moines', 'Dover', 'Frankfort', 'Harrisburg', 'Hartford', 
        'Helena', 'Honolulu', 'Indianapolis', 'Jackson', 'Jefferson City', 'Juneau', 'Lansing', 
        'Lincoln', 'Little Rock', 'Madison', 'Montgomery', 'Montpelier', 'Nashville', 
        'Oklahoma City', 'Olympia', 'Phoenix', 'Pierre', 'Providence', 'Raleigh', 'Richmond', 
        'Sacramento', 'Saint Paul', 'Salem', 'Salt Lake City', 'Santa Fe', 'Springfield', 'Tallahassee', 
        'Topeka', 'Trenton'
      ]);
    });
  });

  describe('getData', () => {
    beforeEach(() => {
      component.selectedCapital.setValue('Albany');
    });

    it('should open a modal dialog', () => {
      weatherServiceMock.getForecast.and.returnValue(of({ city: { coord: { lat: 0, lon: 0 } }, list: [] }));
      weatherServiceMock.getWeather.and.returnValue(of({ weather: [{ main: 'Sunny' }], main: { temp: 300, temp_min: 295, temp_max: 305 } }));

      component.getData();

      expect(matDialogMock.open).toHaveBeenCalled();
    });

    it('should fetch forecast and weather data from the WeatherService', () => {
      weatherServiceMock.getForecast.and.returnValue(of({ city: { coord: { lat: 0, lon: 0 } }, list: [] }));
      weatherServiceMock.getWeather.and.returnValue(of({ weather: [{ main: 'Sunny' }], main: { temp: 300, temp_min: 295, temp_max: 305 } }));

      component.getData();

      expect(weatherServiceMock.getForecast).toHaveBeenCalledWith('Albany');
      expect(weatherServiceMock.getWeather).toHaveBeenCalledWith('Albany');
    });

    it('should populate the component data with the fetched values', () => {
      const forecastData = { city: { coord: { lat: 0, lon: 0 } }, list: [] };
      const weatherData = { weather: [{ main: 'Sunny' }], main: { temp: 300, temp_min: 295, temp_max: 305 } };

      weatherServiceMock.getForecast.and.returnValue(of(forecastData));
      weatherServiceMock.getWeather.and.returnValue(of(weatherData));

      component.getData();

      expect(component.weatherData.name).toBe('Sunny');
      expect(component.weatherData.temp).toBe('26.85°C');
      expect(component.weatherData.tempMin).toBe('21.85°C');
      expect(component.weatherData.tempMax).toBe('31.85°C');
      // TODO: Rest of assertions
    });

    it('should fetch air pollution data and populate the component data', () => {
      weatherServiceMock.getForecast.and.returnValue(of({ city: { coord: { lat: 0, lon: 0 } }, list: [] }));
      weatherServiceMock.getWeather.and.returnValue(of({ weather: [{ main: 'Sunny' }], main: { temp: 300, temp_min: 295, temp_max: 305 } }));
      weatherServiceMock.getAirPollution.and.returnValue(of({ list: [{ main: { aqi: 2 }, components: { co: 1, pm2_5: 2 } }] }));

      component.getData();

      expect(weatherServiceMock.getAirPollution).toHaveBeenCalledWith('0', '0');
      expect(component.airPollutionData.icon).toBe('sentiment_satisfied_alt');
      expect(component.airPollutionData.airQuality).toBe('Fair');
      expect(component.airPollutionData.co).toBe('1 μg/m');
      expect(component.airPollutionData.fineParticles).toBe('2 μg/m');
    });

    it('should close the modal dialog on error', () => {
      weatherServiceMock.getForecast.and.returnValue(of({ city: { coord: { lat: 0, lon: 0 } }, list: [] }));
      weatherServiceMock.getWeather.and.returnValue(of({ weather: [{ main: 'Sunny' }], main: { temp: 300, temp_min: 295, temp_max: 305 } }));
      weatherServiceMock.getAirPollution.and.returnValue(throwError(() => 'Error'));

      component.getData();

      expect(matDialogMock.closeAll).toHaveBeenCalled();
    });

    it('should set `errorAPI` to true on error', () => {
      weatherServiceMock.getForecast.and.returnValue(of({ city: { coord: { lat: 0, lon: 0 } }, list: [] }));
      weatherServiceMock.getWeather.and.returnValue(of({ weather: [{ main: 'Sunny' }], main: { temp: 300, temp_min: 295, temp_max: 305 } }));
      weatherServiceMock.getAirPollution.and.returnValue(throwError(() => 'Error'));

      component.getData();

      expect(component.errorAPI).toBe(true);
    });
  });

  describe('transformToCelcius', () => {
    it('should convert temperature to Celsius', () => {
      expect(component.transformToCelcius(300)).toBe('26.85°C');
      expect(component.transformToCelcius(295)).toBe('21.85°C');
      expect(component.transformToCelcius(305)).toBe('31.85°C');
    });
  });

  describe('airQualityOption', () => {
    it('should return the correct air quality option', () => {
      expect(component.airQualityOption(true, 1)).toBe('sentiment_very_satisfied');
      expect(component.airQualityOption(false, 1)).toBe('Good');
    });
  });

  describe('getAirPollutionData', () => {
    it('should fetch air pollution data from the WeatherService', () => {
      weatherServiceMock.getAirPollution.and.returnValue(of({ list: [{ main: { aqi: 2 }, components: { co: 1, pm2_5: 2 } }] }));

      component.getAirPollutionData('0', '0');

      expect(weatherServiceMock.getAirPollution).toHaveBeenCalledWith('0', '0');
    });

    it('should populate the air pollution data in the component', () => {
      weatherServiceMock.getAirPollution.and.returnValue(of({ list: [{ main: { aqi: 2 }, components: { co: 1, pm2_5: 2 } }] }));

      component.getAirPollutionData('0', '0');

      expect(component.airPollutionData.icon).toBe('sentiment_satisfied_alt');
      expect(component.airPollutionData.airQuality).toBe('Fair');
      expect(component.airPollutionData.co).toBe('1 μg/m');
      expect(component.airPollutionData.fineParticles).toBe('2 μg/m');
    });

    it('should set `showCards` to true and close the modal dialog', () => {
      weatherServiceMock.getAirPollution.and.returnValue(of({ list: [{ main: { aqi: 2 }, components: { co: 1, pm2_5: 2 } }] }));

      component.getAirPollutionData('0', '0');

      expect(component.showCards).toBe(true);
      expect(matDialogMock.closeAll).toHaveBeenCalled();
    });

    it('should set `errorAPI` to true on error', () => {
      weatherServiceMock.getAirPollution.and.returnValue(throwError(() => 'Error'));

      component.getAirPollutionData('0', '0');

      expect(component.errorAPI).toBe(true);
    });
  });

  describe('validSelection', () => {
    it('should return null if the control value is valid', () => {
      const control = new FormControl(1);

      expect(component.validSelection(control)).toBeNull();
    });

    it('should return an error object if the control value is invalid', () => {
      const control = new FormControl(-1);

      expect(component.validSelection(control)).toEqual({ errorValue: true });
    });

    it('should return null if the control value is null', () => {
      const control = new FormControl(null);

      expect(component.validSelection(control)).toBeNull();
    });
  });
});
