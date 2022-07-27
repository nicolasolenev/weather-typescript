import React from 'react';
import { useAppSelector } from '../../hook';

import './weatherDetails.scss';
import { getTime } from '../../functions';

export const WeatherDetails: React.FC = () => {
  const weather = useAppSelector((state) => state.weather);
  const data = weather.data;

  return weather.isReady ? (
    <div className="weather__details">
      <ul className="weather__details_ul">
        <li className="weather__details_li weather__details_city">
          {data.name}
        </li>
        <li className="weather__details_li">
          Temperature: {Math.round(data.main.temp)}°
        </li>
        <li className="weather__details_li">
          Feels like: {Math.round(data.main.feels_like)}°
        </li>
        <li className="weather__details_li">Weather: {data.weather[0].main}</li>
        <li className="weather__details_li">
          Sunrise: {getTime(data.sys.sunrise)}
        </li>
        <li className="weather__details_li">
          Sunset: {getTime(data.sys.sunset)}
        </li>
      </ul>
    </div>
  ) : null;
};
