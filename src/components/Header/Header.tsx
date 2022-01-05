import React from 'react';
import { StoreType } from 'polotno/model/store';
import { observer } from 'mobx-react-lite';
import { UIIcon, UIIconProps } from '../UI/UIIcons/UIIcon';
import { UndoRedo } from '../UndoRedo/UndoRedo';
import { newPageProps } from './helpers';

import s from './styles.module.css';

const HEADER_ITEMS: {
  icon: UIIconProps['icon'];
  text: string;
  className?: string;
  onClick: (s: StoreType) => () => void;
}[] = [
  {
    icon: 'plus',
    text: 'New',
    onClick: store => () => store.addPage(newPageProps),
  },
  { icon: 'save', text: 'Save', onClick: store => () => store.addPage() },
  {
    icon: 'download',
    text: 'Download',
    onClick: store => () => store.addPage(),
  },
  { icon: 'share', text: 'Share', onClick: store => () => store.addPage() },
  { icon: 'question', text: 'Help', onClick: store => () => store.addPage() },
  {
    icon: 'draw',
    className: s.draw,
    text: 'Design your print',
    onClick: store => () => store.addPage(),
  },
];

export const Header = observer(({ store }: { store: StoreType }) => {
  return (
    <div className={s.header}>
      <div className="flex">
        <div className="flex">
          {HEADER_ITEMS.slice(0, 2).map(({ icon, text, onClick }) => (
            <span
              key={icon}
              className={s.headerItem}
              role="presentation"
              onClick={onClick(store)}
            >
              <UIIcon icon={icon} />
              <span>{text}</span>
            </span>
          ))}
        </div>
        <UndoRedo store={store} />
      </div>
      <div className="flex">
        {HEADER_ITEMS.slice(2).map(({ icon, text, className }) => (
          <span key={icon} className={`${s.headerItem} ${className}`}>
            <UIIcon icon={icon as any} />
            <span>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
});
