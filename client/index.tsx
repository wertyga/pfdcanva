import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getOrInitialStores } from '@wertyga/wx';
import * as stores from '../src/stores';
import Routes from '../src/routes/Routes';
import fetch from '../src/utils/fetch';

import '../src/assets/global.css';
import '../src/assets/atom.css';
import '../src/assets/variables.css';

const preloadedState = (window as any).__PRELOADED_STATE__;
delete (window as any).__PRELOADED_STATE__;

const ClientApp = () => {
  getOrInitialStores(stores, {
    initialState: preloadedState || {},
    fetchClient: fetch,
  });
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

hydrate(<ClientApp />, document.getElementById('root'));
