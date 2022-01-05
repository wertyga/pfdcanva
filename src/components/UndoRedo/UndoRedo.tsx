import React from 'react';
import { StoreType } from 'polotno/model/store';
import { FilterItem } from '../Filters/FilterItem/FilterItem';

import s from './styles.module.css';
import { observer } from 'mobx-react-lite';

export const UndoRedo = observer(({ store }: { store: StoreType }) => {
  return (
    <div className={s.undoRedo}>
      <FilterItem
        icon="undo"
        onClick={store.history.undo}
        disabled={!store.history.canUndo}
        className={s.undo}
      />
      <FilterItem
        icon="redo"
        onClick={store.history.redo}
        disabled={!store.history.canRedo}
        className={s.redo}
      />
    </div>
  );
});
