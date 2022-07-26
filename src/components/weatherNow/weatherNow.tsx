import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hook';

import './weatherNow.scss';
import { addFavorite } from '../../store/weatherSlice';
import { getIconUrl } from '../../api';

export const WeatherNow: React.FC = () => {
  const data = useAppSelector((state) => state.data.weather);
  const favoriteCities = useAppSelector((state) => state.favoriteCities);

  const dispatch = useAppDispatch();

  const addToFavoriteHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch(addFavorite(data.name));

  return (
    <div className="weather__now">
      <div className="weather__temperature">{`${data.temperature ?? 0}°`}</div>
      <img
        className="weather__icon"
        src={data.icon && getIconUrl({ iconId: data.icon })}
        alt={data.weather}
      />
      <div className="weather__city">{data.name}</div>
      <div className="weather__add-location">
        {!favoriteCities.includes(data.name) && (
          <button
            className="weather__add-location-button"
            title="add to favorite"
            onClick={addToFavoriteHandler}
          />
        )}
      </div>
    </div>
  );
};
