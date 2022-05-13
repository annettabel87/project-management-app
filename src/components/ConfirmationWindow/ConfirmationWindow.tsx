import React, { FC } from 'react';
import './ConfirmationWindow.css';

export interface ConfirmPropsType {
  onClose: () => void;
  handleOK: () => void;
}
export const ConfirmationWindow: FC<ConfirmPropsType> = ({
  onClose,
  handleOK,
}: ConfirmPropsType) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="confirm"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close" onClick={onClose} />
        <p>Are your sure?</p>
        <div className="button-wrapper">
          <button className="confirm-btn" onClick={handleOK}>
            Ok
          </button>
          <button className="confirm-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
