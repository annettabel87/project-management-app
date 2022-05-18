import React from 'react';
import s from './main-action-button.module.scss';
import Preloader from '../preloader/preloader';

type MainActionButton = {
  actionClick: () => void;
  loadingStatus?: boolean;
  disabledBtnSubmit?: boolean;
  title: string;
};

const MainActionButton = (props: MainActionButton) => {
  return (
    <button
      className={s.blueBtn}
      onClick={props.actionClick}
      disabled={props.loadingStatus || props.disabledBtnSubmit}
    >
      {props.loadingStatus ? <Preloader /> : props.title}
    </button>
  );
};

export default MainActionButton;
