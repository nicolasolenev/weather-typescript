import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hook';

import './info.scss';
import { WeatherNow } from '../weatherNow';
import { WeatherDetails } from '../weatherDetails';
import { WeatherForecast } from '../weatherForecast';
import { Button } from './button';
import { Loader } from '../loader';
import { getUrlsByGeo, getUrlByCity, API_TYPE } from '../../api';
import { fetchWeatherData, fetchForecastData } from '../../store/weatherSlice';

const tabs = {
  now: 'Now',
  details: 'Details',
  forecast: 'Forecast',
};

type ISuccessGeoParam = {
  coords: { latitude: number; longitude: number };
};

export const Info: React.FC = () => {
  const [tab, setTab] = useState(tabs.now);
  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state.selectedCity);
  const weather = useAppSelector((state) => state.weather);
  const isLoaderActive = weather.isFetching;

  let open;

  switch (tab) {
    case tabs.details:
      open = <WeatherDetails />;
      break;

    case tabs.forecast:
      open = <WeatherForecast />;
      break;

    default:
      open = <WeatherNow />;
  }

  useEffect(() => {
    const geo = navigator.geolocation;

    const successGeo = async ({ coords }: ISuccessGeoParam) => {
      const url = getUrlsByGeo(coords.latitude, coords.longitude);
      dispatch(fetchWeatherData(url.weather));
      dispatch(fetchForecastData(url.forecast));
    };

    const denyGeo = () => {
      dispatch(fetchWeatherData(getUrlByCity(API_TYPE.WEATHER, city)));
      dispatch(fetchForecastData(getUrlByCity(API_TYPE.FORECAST, city)));
    };

    geo.getCurrentPosition(successGeo, denyGeo);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="info">
      <div className="info__content">
        {isLoaderActive && <Loader />}
        {open}
      </div>

      <div className="info__tabs">
        <ul className="info__ul">
          <li className="info__li">
            <Button tabName={tabs.now} setTab={setTab} tab={tab} />
          </li>

          <li className="info__li">
            <Button tabName={tabs.details} setTab={setTab} tab={tab} />
          </li>

          <li className="info__li">
            <Button tabName={tabs.forecast} setTab={setTab} tab={tab} />
          </li>
        </ul>
      </div>
    </div>
  );
};
