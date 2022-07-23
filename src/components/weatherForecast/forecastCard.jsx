import React from 'react';

import { getForecastIconUrl } from '../../api';
import { getDay, getTime } from '../../functions';

export function ForecastCard({ data }) {
  return (
    <div className="weather__forecast_card">
      <div className="weather__forecast_date">
        {data.dt ? getDay(data.dt) : '1 Jan'}
      </div>
      <div className="weather__forecast_time">
        {data.dt ? getTime(data.dt) : '00:00'}
      </div>
      <div className="weather__forecast_options">
        <ul className="weather__forecast_options-ul">
          <li className="weather__forecast_options-li">
            Temperature: {data.main ? Math.round(data.main.temp) : '0'}°
          </li>
          <li className="weather__forecast_options-li">
            Feels like: {data.main ? Math.round(data.main.feels_like) : '0'}°
          </li>
        </ul>
      </div>
      <div className="weather__forecast_weather">
        <span className="weather__forecast_weather-span">
          {data.weather ? data.weather[0].main : 'Weather'}
        </span>
        <img
          className="weather__forecast_weather-icon"
          src={data.weather ? getForecastIconUrl(data.weather[0].icon) : ''}
          alt="weather"
        />
      </div>
    </div>
  );
}
