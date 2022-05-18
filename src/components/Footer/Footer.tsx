import { FC } from 'react';
import s from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={s.footer}>
      <img
        className={s.logo}
        src="https://rs.school/images/rs_school_js.svg"
        alt="logo of RS School"
      />
      <a href="https://rs.school/react/" className={s.rsschool}>
        The Rolling Slopes School
      </a>
      <div>2022</div>
      <div className={s.github}>
        <a href="https://github.com/annettabel87" className={s.github__link}>
          Anna Repeshko
        </a>
        <a href="https://github.com/zhirkovpetr" className={s.github__link}>
          Petr Zhirkov
        </a>
        <a href="https://github.com/Der200" className={s.github__link}>
          Nikita Kandziuba
        </a>
      </div>
    </div>
  );
};

export default Footer;
