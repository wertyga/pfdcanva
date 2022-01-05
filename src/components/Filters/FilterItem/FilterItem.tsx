import React, { useState, useEffect } from 'react';
import _noop from 'lodash/noop';
import classnames from 'classnames';
import { UIIcon, UIIconProps } from '../../UI/UIIcons/UIIcon';

import s from './styles.module.css';

type Props = {
  icon: UIIconProps['icon'];
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  dropList?: React.ReactElement;
};

export const FilterItem: React.FC<Props> = ({
  icon,
  text = '',
  onClick = _noop,
  disabled,
  className,
  dropList,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    if (dropList) setOpen(!isOpen);
    onClick();
  };

  useEffect(() => {
    if (disabled && isOpen) {
      setOpen(false);
    }
  }, [disabled]);

  return (
    <span
      className={classnames(className, {
        [s.item]: true,
        [s.disabled]: disabled,
        [s.noText]: !text,
        [s.active]: isOpen,
      })}
      role="presentation"
      onClick={handleClick}
    >
      <UIIcon icon={icon} />
      {!!text && <span>{text}</span>}
      {isOpen && <div className={s.dropList}>{dropList}</div>}
    </span>
  );
};
