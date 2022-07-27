import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hook';

import './weatherNow.scss';
import { addFavorite } from '../../store/weatherSlice';
import { getIconUrl } from '../../api';
import { Popup } from '../popup';

export const WeatherNow: React.FC = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);
  const favoriteCities = useAppSelector((state) => state.favoriteCities);

  const data = weather.data;
  const errorMessage = weather.errorMessage;
  const isError = weather.isError && typeof errorMessage === 'string';

  const addToFavoriteHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch(addFavorite(data.name));

  return weather.isReady ? (
    <div className="weather__now">
      <div className="weather__temperature">{`${Math.round(
        data.main.temp
      )}°`}</div>
      <img
        className="weather__icon"
        src={getIconUrl({ iconId: data.weather[0].icon })}
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
  ) : isError ? (
    <Popup type="error" text={errorMessage} />
  ) : null;
};
