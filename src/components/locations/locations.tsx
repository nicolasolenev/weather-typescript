import React from 'react';
import { useSelector } from 'react-redux';

import './locations.scss';
import { Location } from './location';
import { IState } from '../../types';

export const Locations: React.FC = () => {
  const cities = useSelector((state: IState) => state.favoriteCities);

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
