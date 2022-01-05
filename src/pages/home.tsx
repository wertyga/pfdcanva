import React, { useRef } from 'react';
import {
  PolotnoContainer,
  SidePanelWrap,
  WorkspaceWrap,
} from 'polotno/polotno-app';
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import Workspace from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';

import { Header } from '../components/Header/Header';
import { usePolonoStore } from '../hooks/usePolonoStore';

const Polotno = () => {
  const store = usePolonoStore();

  return (
    <PolotnoContainer className="container flex-column">
      <Header store={store} />
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

export default Polotno;
