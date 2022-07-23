import React from 'react';
import { useSelector } from 'react-redux';

import './weatherForecast.scss';
import { ForecastCard } from './forecastCard';

export function WeatherForecast() {
  const data = useSelector((state) => state.data.forecast);

  return (
    <div className="weather__forecast">
      <h2 className="weather__forecast_city">{data?.city?.name || 'City'}</h2>

      <div className="weather__forecast_cards">
        {data.list &&
          data.list.map((data) => <ForecastCard key={data.dt} data={data} />)}
      </div>
    </div>
  );
}
