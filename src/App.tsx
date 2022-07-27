import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hook';

import './App.scss';
import { Search } from './components/search';
import { Info } from './components/info';
import { Locations } from './components/locations';
import { fetchWeatherData, fetchForecastData } from './store/weatherSlice';
import { getUrlsByGeo } from './api';

type ISuccessGeoParam = {
  coords: { latitude: number; longitude: number };
};

export default function App() {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.selectedCity);

  useEffect(() => {
    const geo = navigator.geolocation;

    const successGeo = async ({ coords }: ISuccessGeoParam) => {
      const url = getUrlsByGeo(coords.latitude, coords.longitude);
      dispatch(fetchWeatherData(url.weather));
      dispatch(fetchForecastData(url.forecast));
    };

    const denyGeo = () => dispatch(fetchWeatherData(city));

    geo.getCurrentPosition(successGeo, denyGeo);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="weather">
        <Search />
        <div className="weather__container">
          <Info />
          <Locations />
        </div>
      </div>
    </div>
  );
}
