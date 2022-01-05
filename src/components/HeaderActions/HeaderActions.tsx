import React from 'react';
import classnames from 'classnames';
import { StoreType } from 'polotno/model/store';
import { UIIcon } from '../UI/UIIcons/UIIcon';
import { useStore } from '../../hooks/useStore';
import { actions } from './helpers';

import s from './styles.module.css';

export const HeaderActions = ({ store }: { store: StoreType }) => {
  const { activeTab, changeTab } = useStore(['activeTab']);
  return (
    <div className={s.headerActions}>
      {actions.map(({ icon, text }) => (
        <span
          role="presentation"
          onClick={() => changeTab(text)}
          key={icon}
          className={classnames({
            [s.item]: true,
            [s.active]: activeTab === text,
          })}
        >
          <UIIcon icon={icon} />
          <span>{text}</span>
        </span>
      ))}
    </div>
  );
};
