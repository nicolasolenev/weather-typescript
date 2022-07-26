import React from 'react';
import { useAppSelector } from '../../hook';

import './locations.scss';
import { Location } from './location';

export const Locations: React.FC = () => {
  const cities = useAppSelector((state) => state.favoriteCities);

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
};
