import React from 'react';

import { NO_VIEW, VIEW } from '../../constants/constants';
import s from './show-password.module.scss';

type TShowPassword = {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};

const ShowPasswords = (props: TShowPassword) => {
  const { showPassword, setShowPassword } = props;
  return (
    <img
      alt={'your password'}
      src={showPassword ? NO_VIEW : VIEW}
      className={s.passwordControl}
      onClick={() => {
        setShowPassword(!showPassword);
      }}
    />
  );
};

export default ShowPasswords;
