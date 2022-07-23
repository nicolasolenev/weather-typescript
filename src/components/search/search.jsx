import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './search.scss';
import { fetchWeatherData } from '../../store/reducers';

export function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(fetchWeatherData({ city: value }));
    setValue('');
  };

  const inputHandler = (e) => {
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
