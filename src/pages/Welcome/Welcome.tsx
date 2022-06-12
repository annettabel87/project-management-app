import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import s from './Welcome.module.scss';

const Welcome: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={s.welcomePage}>
      <section className={s.appInfo}>
        <div className={s.container}>
          <div className={s.textWrapper}>
            <h1 className={s.title}>Trello clone</h1>
            <p className={s.description}>{t('welcome_description')}</p>
          </div>
          <div className={s.teamSection}>
            <div className={s.card}>
              <p>{t('team')}</p>
              <ul>
                <li>{t('anna_repeshko')}</li>
                <li> {t('petr_zhirkov')}</li>
                <li>{t('nikita_kandziuba')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className={s.appDescription}>
        <div className={`${s.container} ${s.descriptionContainer}`}>
          <div className={s.image} />
          <div>
            <p className={s.item}>{t('about_app')}</p>
            <ul>
              <li className={s.item}>{t('functional_1')}</li>
              <li className={s.item}>{t('functional_2')}</li>
              <li className={s.item}>{t('functional_3')}</li>
              <li className={s.item}>{t('functional_4')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
