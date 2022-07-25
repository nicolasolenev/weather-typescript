import React from 'react';
import { TailSpin } from 'react-loader-spinner';

import './loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <TailSpin color="gray" height={80} width={80} />
    </div>
  );
};
