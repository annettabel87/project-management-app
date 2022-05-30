import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import s from './ConfirmationWindow.module.scss';

export interface ConfirmPropsType {
  onClose: () => void;
  handleOK: () => void;
}
const ConfirmationWindow: FC<ConfirmPropsType> = ({ onClose, handleOK }: ConfirmPropsType) => {
  const { t } = useTranslation();
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
        <p>{t('are_your_sure')}</p>
        <div className={s.buttonWrapper}>
          <button className={s.confirmBtn} onClick={handleOK}>
            {t('ok')}
          </button>
          <button className={s.confirmBtn} onClick={onClose}>
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;
