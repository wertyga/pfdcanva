import React, { useEffect, useRef } from 'react';
import { createStore } from 'polotno/model/store';
import s from './styles.module.css';
import {
  PolotnoContainer,
  SidePanelWrap,
  WorkspaceWrap,
} from 'polotno/polotno-app';
import { Header } from '../Header/Header';
import { useStore } from '../../hooks/useStore';
import { HeaderActions } from '../HeaderActions/HeaderActions';
import { Filters } from '../Filters/Filters';
import { SidePanel } from 'polotno/side-panel';
import Toolbar from 'polotno/toolbar/toolbar';
import Workspace from 'polotno/canvas/workspace';
import { handleSelectedElements } from '../../utils/polotno';

// import './toolbar.css';

const POLONTO_API_KEY = '3gylZuBSeYiTZ7Oxwghd';

export const App = () => {
  const { getFonts } = useStore();
  const store = useRef(createStore({ key: POLONTO_API_KEY, showCredit: true }));

  useEffect(() => {
    store.current.on('change', st => {
      console.log(st);
      handleSelectedElements(store.current, el => {
        const { cropX, cropY, cropHeight, cropWidth } = el;
        console.log({ cropX, cropY, cropHeight, cropWidth });
      });
    });
    // getFonts();
  }, []);

  return (
    <div className={s.polotno}>
      <PolotnoContainer className="container flex-column">
        <Header store={store.current} />
        <HeaderActions store={store.current} />

        <Toolbar store={store.current} />

        <div className="flex">
          <SidePanelWrap>
            <SidePanel store={store.current} />
          </SidePanelWrap>
          <WorkspaceWrap
            className="flex-column"
            style={{
              minWidth: 649,
            }}
          >
            <Filters store={store.current} />
            <Workspace store={store.current} pageControlsEnabled={false} />
          </WorkspaceWrap>
        </div>
      </PolotnoContainer>
    </div>
  );
};
