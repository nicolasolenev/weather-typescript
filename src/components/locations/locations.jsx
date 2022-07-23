import React from 'react';
import { useSelector } from 'react-redux';

import './locations.scss';
import { Location } from './location';

export function Locations() {
  const cities = useSelector((state) => state.favoriteCities);

  return (
    <div className="locations">
      <h2 className="locations__title">Added Locations:</h2>

      <ul className="locations__ul">
        {cities.map((city) => (
          <Location key={city} city={city} />
        ))}
      </ul>
    </div>
  );
}
