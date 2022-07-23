import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './weatherNow.scss';
import { addFavorite } from '../../store/reducers';
import { getIconUrl } from '../../api';

export function WeatherNow() {
  const data = useSelector((state) => state.data.weather);
  const favoriteCities = useSelector((state) => state.favoriteCities);

  const dispatch = useDispatch();

  const addHandler = () => dispatch(addFavorite({ city: data.name }));

  return (
    <div className="weather__now">
      <div className="weather__temperature">
        {data.temperature ? `${data.temperature}°` : ''}
      </div>
      <img
        className="weather__icon"
        src={data.icon ? getIconUrl(data.icon) : ''}
        alt={data.weather}
      />
      <div className="weather__city">{data.name || ''}</div>
      <div className="weather__add-location">
        {!favoriteCities.includes(data.name) && (
          <button
            className="weather__add-location-button"
            title="add to favorite"
            onClick={addHandler}
          />
        )}
      </div>
    </div>
  );
}
