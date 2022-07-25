import React from 'react';

interface IButtonProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tabName: string;
  tab: string;
}

export const Button: React.FC<IButtonProps> = ({ tabName, setTab, tab }) => {
  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTab(tabName);
  };

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
};
