import React from 'react';
import { useSelector } from 'react-redux';

import './weatherDetails.scss';
import { getTime } from '../../functions';
import { IState } from '../../types';

export const WeatherDetails: React.FC = () => {
  const data = useSelector((state: IState) => state.data.weather);

  return (
    <div className="weather__details">
      <ul className="weather__details_ul">
        <li className="weather__details_li weather__details_city">
          {data.name}
        </li>
        <li className="weather__details_li">
          Temperature: {data.temperature}°
        </li>
        <li className="weather__details_li">Feels like: {data.feelsLike}°</li>
        <li className="weather__details_li">Weather: {data.weather}</li>
        <li className="weather__details_li">
          Sunrise: {getTime(data.sunrise)}
        </li>
        <li className="weather__details_li">Sunset: {getTime(data.sunset)}</li>
      </ul>
    </div>
  );
};
