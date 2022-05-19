import React, { FocusEvent, useState } from 'react';

import s from './input-container.module.scss';

type InputContainerPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  value?: string;
  type?: 'name' | 'login' | 'password' | 'text';
  errors?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};
const InputContainer: React.ForwardRefExoticComponent<InputContainerPropsType> = React.forwardRef<
  HTMLInputElement,
  InputContainerPropsType
>((props, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const typeShowInput = () => {
    if (props.type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return props.type;
  };

  return (
    <label className={s.emailPasswordContainer}>
      <span className={s.inputTitle}>{props.title}</span>
      <input ref={ref} {...props} type={typeShowInput()} />
      {props.type === 'password' && (
        <img
          alt={'your password'}
          src={
            showPassword
              ? 'https://snipp.ru/demo/495/no-view.svg'
              : 'https://snipp.ru/demo/495/view.svg'
          }
          className={s.passwordControl}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      )}
      <span className={s.errorEmailPasswordMessage}>{props.errors}</span>
    </label>
  );
});

export default InputContainer;
