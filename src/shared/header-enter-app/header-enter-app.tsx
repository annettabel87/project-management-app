import s from './header-enter-app.module.scss';

type HeaderEnterAppType = {
  title?: string;
};
const HeaderEnterApp = ({ title }: HeaderEnterAppType) => {
  return (
    <div className={s.wrapper}>
      <h1>{title}</h1>
    </div>
  );
};

export default HeaderEnterApp;
