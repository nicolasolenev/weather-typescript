import React from 'react';

import { getIconUrl } from '../../api';
import { getDay, getTime } from '../../functions';
import { IForecastData } from './weatherForecast';

export const ForecastCard: React.FC<{ data: IForecastData }> = ({ data }) => {
  return (
    <div className="weather__forecast_card">
      <div className="weather__forecast_date">{getDay(data.dt)}</div>
      <div className="weather__forecast_time">{getTime(data.dt)}</div>
      <div className="weather__forecast_options">
        <ul className="weather__forecast_options-ul">
          <li className="weather__forecast_options-li">
            Temperature: {Math.round(data.main.temp)}°
          </li>
          <li className="weather__forecast_options-li">
            Feels like: {Math.round(data.main.feels_like)}°
          </li>
        </ul>
      </div>
      <div className="weather__forecast_weather">
        <span className="weather__forecast_weather-span">
          {data.weather[0].main}
        </span>
        <img
          className="weather__forecast_weather-icon"
          src={getIconUrl({ iconId: data.weather[0].icon, forecast: true })}
          alt="weather"
        />
      </div>
    </div>
  );
};
