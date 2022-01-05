import React, { SyntheticEvent, ComponentProps } from 'react';
import classnames, { Mapping } from 'classnames';
import _noop from 'lodash/noop';
import * as icons from './iconData';

export interface UIIconProps extends ComponentProps<any> {
  icon: keyof typeof icons;
  onClick?: (e: any) => void;
  className?: Mapping | string;
}

export const UIIcon: React.FC<UIIconProps> = ({
  icon,
  onClick = _noop,
  className,
  ...restProps
}) => {
  const Icon = icons[icon];
  return (
    <div
      className={classnames('UI__icon', className)}
      role="presentation"
      onClick={onClick}
      {...restProps}
    >
      {!!Icon && <Icon />}
    </div>
  );
};
