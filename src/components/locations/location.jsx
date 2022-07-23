import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchWeatherData, deleteFavorite } from '../../store/reducers';

export function Location({ city }) {
  const dispatch = useDispatch();

  const cityHandler = () => {
    dispatch(fetchWeatherData({ city }));
  };

  const deleteHandler = () => dispatch(deleteFavorite({ city }));

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
}
