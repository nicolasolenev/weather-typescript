import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './weatherNow.scss';
import { addFavorite } from '../../store/reducers';
import { getIconUrl } from '../../api';
import { IState } from '../../types';

export const WeatherNow: React.FC = () => {
  const data = useSelector((state: IState) => state.data.weather);
  const favoriteCities = useSelector((state: IState) => state.favoriteCities);

  const dispatch = useDispatch();

  const addHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch(addFavorite({ city: data.name }));

  return (
    <div className="weather__now">
      <div className="weather__temperature">{`${data.temperature}°`}</div>
      <img
        className="weather__icon"
        src={getIconUrl({ iconId: data.icon })}
        alt={data.weather}
      />
      <div className="weather__city">{data.name}</div>
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
};
