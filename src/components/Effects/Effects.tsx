import React, { useEffect } from 'react';
import { StoreType } from 'polotno/model/store';
import { observer } from 'mobx-react-lite';
import { getSelectedElements } from '../../utils/polotno';

import s from './styles.module.css';

export const Effects = observer(({ store }: { store: StoreType }) => {
  return (
    <div className={s.effects}>
      <span role="presentation">Flip</span>
      <span role="presentation">Effects</span>
      <span role="presentation">Fit to background</span>
      <span role="presentation">Crop</span>
    </div>
  );
});
