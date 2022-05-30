import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './NotFound.module.scss';

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
