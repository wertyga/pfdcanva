import React, { useState, useEffect } from 'react';
import { StoreType } from 'polotno/model/store';
import { UIDropCard } from '../../UI/UIDropCard/UIDropCard';
import { UIRangeInput } from '../../UI/UIRangeInput/UIRangeInput';
import { handleSelectedElements } from '../../../utils/polotno';

import s from './styles.module.css';

export const TransparencyInput = ({ store }: { store: StoreType }) => {
  const [state, setState] = useState({
    value: 0,
  });

  useEffect(() => {
    let maxOpacity = 0;
    handleSelectedElements(store, el => {
      if (el.opacity > maxOpacity) maxOpacity = el.opacity;
    });
    setState(prev => ({ ...prev, value: maxOpacity * 100 }));
  }, []);

  const handleChange = ({ target: { value } }) => {
    setState(prev => ({ ...prev, value }));
  };

  useEffect(() => {
    handleSelectedElements(store, el => {
      el.set({ opacity: Number(state.value) / 100 });
    });
  }, [state.value]);

  return (
    <UIDropCard className={s.transparency}>
      <span>0%</span>
      <UIRangeInput onChange={handleChange} value={state.value} />
      <span>100%</span>
    </UIDropCard>
  );
};
