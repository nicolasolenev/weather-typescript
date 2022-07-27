import React from 'react';

import './App.scss';
import { Search } from './components/search';
import { Info } from './components/info';
import { Locations } from './components/locations';

export default function App() {
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
