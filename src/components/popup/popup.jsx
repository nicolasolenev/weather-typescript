import React from 'react';

import './popup.scss';

export function Popup({ type, text }) {
  return (
    <div className="popup-wrapper">
      <div className={`popup ${type}`}>{text}</div>
    </div>
  );
}
