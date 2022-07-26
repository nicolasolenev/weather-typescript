import React from 'react';
import { useAppDispatch } from '../../hook';

import { fetchWeatherData, deleteFavorite } from '../../store/weatherSlice';

interface ILocationProps {
  city: string;
}

export const Location: React.FC<ILocationProps> = ({ city }) => {
  const dispatch = useAppDispatch();

  const cityHandler = () => {
    dispatch(fetchWeatherData(city));
  };

  const deleteHandler = () => dispatch(deleteFavorite(city));

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
