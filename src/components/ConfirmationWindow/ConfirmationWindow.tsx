import { FC } from 'react';
import styles from './ConfirmationWindow.module.scss';

export interface ConfirmPropsType {
  onClose: () => void;
  handleOK: () => void;
}
const ConfirmationWindow: FC<ConfirmPropsType> = ({ onClose, handleOK }: ConfirmPropsType) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.confirm}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={styles.close} onClick={onClose}>
          X
        </button>
        <p>Are your sure?</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.confirmBtn} onClick={handleOK}>
            Ok
          </button>
          <button className={styles.confirmBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
