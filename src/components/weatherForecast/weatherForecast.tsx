import React from 'react';
import { useSelector } from 'react-redux';

import './weatherForecast.scss';
import { ForecastCard } from './forecastCard';
import { IState } from '../../types';

export interface IForecastData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: any[];
}

export const WeatherForecast: React.FC = () => {
  const data = useSelector((state: IState) => state.data.forecast);

  return (
    <div className="weather__forecast">
      <h2 className="weather__forecast_city">{data.city?.name}</h2>

      <div className="weather__forecast_cards">
        {data.list &&
          data.list.map((data: IForecastData) => (
            <ForecastCard key={data.dt} data={data} />
          ))}
      </div>
    </div>
  );
};
