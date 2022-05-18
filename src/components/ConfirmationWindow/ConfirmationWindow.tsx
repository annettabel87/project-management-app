import { FC } from 'react';
import s from './ConfirmationWindow.module.scss';

export interface ConfirmPropsType {
  onClose: () => void;
  handleOK: () => void;
}
const ConfirmationWindow: FC<ConfirmPropsType> = ({ onClose, handleOK }: ConfirmPropsType) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.confirm}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={s.close} onClick={onClose}>
          X
        </button>
        <p>Are your sure?</p>
        <div className={s.buttonWrapper}>
          <button className={s.confirmBtn} onClick={handleOK}>
            Ok
          </button>
          <button className={s.confirmBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
