import React, { useState } from 'react';
import { useAppDispatch } from '../../hook';

import './search.scss';
import { fetchWeatherData, fetchForecastData } from '../../store/weatherSlice';
import { getUrlByCity, API_TYPE } from '../../api';

export function Search() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const formHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(fetchWeatherData(getUrlByCity(API_TYPE.WEATHER, value)));
    dispatch(fetchForecastData(getUrlByCity(API_TYPE.FORECAST, value)));
    setValue('');
  };

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={formHandler}>
        <input
          className="search__input"
          type="text"
          placeholder="Aktobe"
          value={value}
          onChange={inputHandler}
        />

        <button className="search__button" title="get weather" />
      </form>
    </div>
  );
}
