import { FC } from 'react';
import './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className="footer">
      <img
        className="logo"
        src="https://rs.school/images/rs_school_js.svg"
        alt="logo of RS School"
      />
      <a href="https://rs.school/react/" className="rsschool">
        The Rolling Slopes School
      </a>
      <div>2022</div>
      <div className="github-links">
        <a href="https://github.com/annettabel87" className="github-link">
          Anna Repeshko
        </a>
        <a href="https://github.com/zhirkovpetr" className="github-link">
          Petr Zhirkov
        </a>
        <a href="https://github.com/Der200" className="github-link">
          Nikita Kandzyuba
        </a>
      </div>
    </div>
  );
};

export default Footer;
