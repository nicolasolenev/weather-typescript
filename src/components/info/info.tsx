import React, { useState } from 'react';
import { useAppSelector } from '../../hook';

import './info.scss';
import { WeatherNow } from '../weatherNow';
import { WeatherDetails } from '../weatherDetails';
import { WeatherForecast } from '../weatherForecast';
import { Button } from './button';
import { Loader } from '../loader';
import { Popup } from '../popup';

const tabs = {
  now: 'Now',
  details: 'Details',
  forecast: 'Forecast',
};

export const Info: React.FC = () => {
  const [tab, setTab] = useState(tabs.now);

  const weather = useAppSelector((state) => state.weather);

  const isLoaderActive = weather.isFetching;
  const errorMessage = weather.errorMessage;
  const isError = weather.isError && typeof errorMessage === 'string';

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

  return (
    <div className="info">
      <div className="info__content">
        {isLoaderActive && <Loader />}
        {isError && <Popup type="error" text={errorMessage} />}
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
