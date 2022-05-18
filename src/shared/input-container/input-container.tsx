import { ChangeEvent, FocusEvent, useState } from 'react';
import s from './input-container.module.scss';

type InputContainerPropsType = {
  title?: string;
  value: string;
  changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  typeInput: 'name' | 'login' | 'password' | 'text';
  placeholder?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};
const InputContainer = (props: InputContainerPropsType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const typeShowInput = () => {
    if (props.typeInput === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return props.typeInput;
  };

  return (
    <label className={s.emailPasswordContainer}>
      <span className={s.inputTitle}>{props.title}</span>
      <input
        name={props.title}
        type={typeShowInput()}
        value={props.value}
        onChange={props.changeValue}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
      />
      {props.typeInput === 'password' && (
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
      <span className={s.errorEmailPasswordMessage}>{props.errorMessage}</span>
    </label>
  );
};

export default InputContainer;
