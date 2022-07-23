import React from 'react';
import { useSelector } from 'react-redux';

import './weatherDetails.scss';
import { getTime } from '../../functions';

export function WeatherDetails() {
  const data = useSelector((state) => state.data.weather);

  return (
    <div className="weather__details">
      <ul className="weather__details_ul">
        <li className="weather__details_li weather__details_city">
          {data.name || 'City'}
        </li>
        <li className="weather__details_li">
          Temperature: {data.temperature || '0'}°
        </li>
        <li className="weather__details_li">
          Feels like: {data.feelsLike || '0'}°
        </li>
        <li className="weather__details_li">
          Weather: {data.weather || 'Weather'}
        </li>
        <li className="weather__details_li">
          Sunrise: {data.sunrise ? getTime(data.sunrise) : '00:00'}
        </li>
        <li className="weather__details_li">
          Sunset: {data.sunset ? getTime(data.sunset) : '00:00'}
        </li>
      </ul>
    </div>
  );
}
