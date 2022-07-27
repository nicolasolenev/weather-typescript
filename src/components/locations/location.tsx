import React from 'react';
import { useAppDispatch } from '../../hook';

import {
  fetchWeatherData,
  fetchForecastData,
  deleteFavorite,
} from '../../store/weatherSlice';
import { getUrlByCity, API_TYPE } from '../../api';

interface ILocationProps {
  city: string;
}

export const Location: React.FC<ILocationProps> = ({ city }) => {
  const dispatch = useAppDispatch();

  const cityHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(fetchWeatherData(getUrlByCity(API_TYPE.WEATHER, city)));
    dispatch(fetchForecastData(getUrlByCity(API_TYPE.FORECAST, city)));
  };

  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch(deleteFavorite(city));

  return (
    <li className="locations__li">
      <button
        className="locations__city"
        title="get weather"
        onClick={cityHandler}
      >
        {city}
      </button>

      <button
        className="locations__city_delete-button"
        title="delete city"
        onClick={deleteHandler}
      />
    </li>
  );
};
