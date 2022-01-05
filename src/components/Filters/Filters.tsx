import React from 'react';
import { StoreType } from 'polotno/model/store';
import ImageToolbar from 'polotno/toolbar/image-toolbar';
import { observer } from 'mobx-react-lite';
import { LayerDropList } from './LayerDropList/LayerDropList';
import { TransparencyInput } from './TransparencyInput/TransparencyInput';
import { FilterItem } from './FilterItem/FilterItem';
import { Effects } from '../Effects/Effects';
import {
  handleSelectedElements,
  getSelectedElements,
} from '../../utils/polotno';

import s from './styles.module.css';

export const Filters = observer(({ store }: { store: StoreType }) => {
  const selectedEl = getSelectedElements(store)[0] || {};
  return (
    <div className={s.filters}>
      <Effects store={store} />
      <div className={s.actions}>
        <FilterItem
          icon="position"
          dropList={<LayerDropList store={store} />}
          disabled={
            !store.selectedElementsIds || !store.selectedElementsIds.length
          }
        />
        <FilterItem
          icon="transparency"
          onClick={store.history.redo}
          dropList={<TransparencyInput store={store} />}
          disabled={
            !store.selectedElementsIds || !store.selectedElementsIds.length
          }
        />
        <FilterItem
          icon={selectedEl.locked ? 'unlocked' : 'locked'}
          onClick={() => {
            handleSelectedElements(store, el => {
              el.set({ locked: !el.locked });
            });
          }}
          disabled={
            !store.selectedElementsIds || !store.selectedElementsIds.length
          }
        />
        <FilterItem
          icon="copy"
          disabled={
            !store.selectedElementsIds || !store.selectedElementsIds.length
          }
          onClick={() => {
            handleSelectedElements(store, ({ id, ...attrs }) => {
              store.activePage?.addElement({
                ...attrs,
                x: attrs.x + 50,
                y: attrs.y + 50,
              });
            });
          }}
        />
        <FilterItem
          icon="del"
          disabled={
            !store.selectedElementsIds || !store.selectedElementsIds.length
          }
          onClick={() => {
            store.deleteElements(store.selectedElementsIds);
          }}
        />
      </div>
    </div>
  );
});
