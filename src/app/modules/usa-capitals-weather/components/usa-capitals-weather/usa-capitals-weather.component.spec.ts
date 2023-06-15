import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaCapitalsWeatherComponent } from './usa-capitals-weather.component';

describe('UsaCapitalsWeatherComponent', () => {
  let component: UsaCapitalsWeatherComponent;
  let fixture: ComponentFixture<UsaCapitalsWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsaCapitalsWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsaCapitalsWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
