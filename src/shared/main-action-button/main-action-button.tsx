import s from './main-action-button.module.scss';
import { Preloader } from '../preloader/preloader';

type MainActionButton = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  actionClick?: () => void;
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  disabledBtnSubmit?: boolean;
  title: string;
};

const MainActionButton = (props: MainActionButton) => {
  const pendingStatus = props.loadingStatus === 'pending';
  return (
    <button
      type={props.type}
      className={s.blueBtn}
      onClick={props.actionClick}
      disabled={pendingStatus || props.disabledBtnSubmit}
    >
      {pendingStatus ? <Preloader /> : props.title}
    </button>
  );
};

export default MainActionButton;
