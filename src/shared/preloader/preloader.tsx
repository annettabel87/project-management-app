import React from 'react';
import loading from '../../assets/image/svg/loading.svg';

export const Preloader = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <img
        alt={'LOADING, PLEASE WAIT'}
        src={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      />
    </div>
  );
};
