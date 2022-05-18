import React, { FC, useEffect } from 'react';
import ReactDom from 'react-dom';
import { ModalProps } from '../../interfaces/Interfaces';
import './Modal.module.scss';

const Modal: FC<ModalProps> = React.memo(({ children, open }: ModalProps) => {
  const domNode = document.getElementById('portal');
  const element = document.createElement('div');
  useEffect(() => {
    domNode?.appendChild(element);
    return () => {
      domNode?.removeChild(element);
    };
  });

  return open ? ReactDom.createPortal(children, element) : null;
});

export default Modal;
