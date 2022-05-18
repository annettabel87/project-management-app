import Preloader from '../preloader/preloader';
import s from './main-action-button.module.scss';

type MainActionButton = {
  actionClick: () => void;
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  disabledBtnSubmit?: boolean;
  title: string;
};

const MainActionButton = (props: MainActionButton) => {
  const pendingStatus = props.loadingStatus === 'pending' ? true : false;
  return (
    <button
      className={s.blueBtn}
      onClick={props.actionClick}
      disabled={pendingStatus || props.disabledBtnSubmit}
    >
      {pendingStatus ? <Preloader /> : props.title}
    </button>
  );
};

export default MainActionButton;
