import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hook';

import './App.scss';
import { Search } from './components/search';
import { Info } from './components/info';
import { Locations } from './components/locations';
import { fetchWeatherData } from './store/weatherSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.selectedCity);

  useEffect(() => {
    const geo = navigator.geolocation;

    const successGeo = async ({
      coords,
    }: {
      coords: { latitude: number; longitude: number };
    }) => {
      dispatch(fetchWeatherData([coords.latitude, coords.longitude]));
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
