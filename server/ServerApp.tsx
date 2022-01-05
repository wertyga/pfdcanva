import React from 'react';
import { Request } from 'express';
import { StaticRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { getOrInitialStores } from '@wertyga/wx';
import Routes from '../src/routes/Routes';
import * as stores from '../src/stores';
import fetch from '../src/utils/fetch';

type AppType = {
  req: Request;
  context?: StaticContext;
  store?: any;
  initialState?: any;
};

export const ServerApp = ({ req, context, initialState }: AppType) => {
  getOrInitialStores(stores, {
    initialState: initialState || {},
    fetchClient: fetch,
  });
  return (
    <StaticRouter location={req.url} context={context}>
      <Routes />
    </StaticRouter>
  );
};
