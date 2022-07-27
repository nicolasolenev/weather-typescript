import React from 'react';
import { useAppSelector } from '../../hook';

import './weatherForecast.scss';
import { ForecastCard } from './forecastCard';

export interface IForecastData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: any[];
}

export const WeatherForecast: React.FC = () => {
  const forecast = useAppSelector((state) => state.forecast);
  const data = forecast.data;

  return forecast.isReady ? (
    <div className="weather__forecast">
      <h2 className="weather__forecast_city">{data.city.name}</h2>

      <div className="weather__forecast_cards">
        {data.list &&
          data.list.map((data: IForecastData) => (
            <ForecastCard key={data.dt} data={data} />
          ))}
      </div>
    </div>
  ) : null;
};
