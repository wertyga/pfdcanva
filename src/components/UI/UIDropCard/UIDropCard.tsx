import React from 'react';
import s from './styles.module.css';

export const UIDropCard = ({ children, className = '' }) => {
  return (
    <div className={`${s.dropCard} UI__dropCard ${className}`}>{children}</div>
  );
};
