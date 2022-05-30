import { FC } from 'react';
import './NotFound.module.scss';
import { useTranslation } from 'react-i18next';

const NotFound: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>404</h2>
      <div>{t('page_not_found')}</div>
    </div>
  );
};

export default NotFound;
