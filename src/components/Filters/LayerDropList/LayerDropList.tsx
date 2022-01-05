import React from 'react';
import { UIIcon } from '../../UI/UIIcons/UIIcon';
import { UIDropCard } from '../../UI/UIDropCard/UIDropCard';
import { StoreType } from 'polotno/model/store';
import { getLayerActions } from './helpers';

import s from './styles.module.css';

export const LayerDropList = ({ store }: { store: StoreType }) => {
  const actions = getLayerActions(store);

  return (
    <UIDropCard className={s.layerDropList}>
      {actions.map(({ icon, onClick, text, divider }) => {
        if (divider) {
          return <span className="divider" key="divider" />;
        }
        return (
          <span
            key={icon}
            role="presentation"
            onClick={onClick}
            className={s.item}
          >
            <UIIcon icon={icon as any} />
            <span>{text}</span>
          </span>
        );
      })}
    </UIDropCard>
  );
};
