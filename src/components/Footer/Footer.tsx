import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import s from './Footer.module.scss';

const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={s.footer}>
      <img
        className={s.logo}
        src="https://rs.school/images/rs_school_js.svg"
        alt="logo of RS School"
      />
      <a href="https://rs.school/react/" className={s.rsschool}>
        The Rolling Scopes School
      </a>
      <div>2022</div>
      <div className={s.github}>
        <a href="https://github.com/annettabel87" className={s.github__link}>
          {t('anna_repeshko')}
        </a>
        <a href="https://github.com/zhirkovpetr" className={s.github__link}>
          {t('petr_zhirkov')}
        </a>
        <a href="https://github.com/Der200" className={s.github__link}>
          {t('nikita_kandziuba')}
        </a>
      </div>
    </div>
  );
};

export default Footer;
