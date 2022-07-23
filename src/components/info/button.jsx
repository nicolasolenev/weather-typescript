import React from 'react';

export function Button({ clickHandler, tabName, tab }) {
  return (
    <button
      className={
        tab === tabName
          ? 'info__tabs_button info__tabs_button-active'
          : 'info__tabs_button'
      }
      onClick={clickHandler}
    >
      {tabName}
    </button>
  );
}
