import React from 'react';

import './popup.scss';

interface IPopupProps {
  type: string;
  text: string;
}

export const Popup: React.FC<IPopupProps> = ({ type, text }) => {
  return (
    <div className="popup-wrapper">
      <div className={`popup ${type}`}>{text}</div>
    </div>
  );
};
