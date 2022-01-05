import React from 'react';
import fs from 'fs';
import path from 'path';
import { initializeStores } from '@wertyga/wx';
import ReactDOMServer from 'react-dom/server';
import * as stores from '../src/stores';
import fetch from '../src/utils/fetch';

import { ServerApp } from './ServerApp';

let cachedMainHTML = '';
let cachedCss = '';

export const handlePage = async (req, res, context) => {
  const indexFile =
    cachedMainHTML ||
    fs.readFileSync(
      path.resolve(process.cwd(), 'public/client_dist/main.html'),
      'utf8'
    );
  let cssFile;
  try {
    cssFile =
      cachedCss ||
      fs.readFileSync(
        path.resolve(process.cwd(), 'public/client_dist/main.css'),
        'utf8'
      );
  } catch (e) {}

  if (!cachedMainHTML) cachedMainHTML = indexFile;

  const wxStore = initializeStores(stores, {
    fetchClient: fetch,
  });

  const storesState = {} as any;
  Object.entries(wxStore).forEach(([storeName, store]: any) => {
    const { fetch, ...rest } = store;
    storesState[storeName] = rest;
  });
  delete storesState.rootStore;
  //
  // const html = ReactDOMServer.renderToString(
  //   <ServerApp req={req} context={context} initialState={storesState} />
  // );

  return (
    indexFile
      // .replace('<!-- ::APP:: -->', html)
      .replace('<!-- ::CSS:: -->', `<style>${cssFile}</style>`)
      .replace(
        '<!-- ::DATA:: -->',
        `<script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(storesState)}
      window.initialPage = "${req.path}"
    </script>`
      )
  );
};

export async function handleRender(req, res, next) {
  if (req.url.includes('.')) {
    return next();
  }
  try {
    const context = {};

    // @ts-ignore
    if (context.url) return res.redirect(301, context.url);

    const page = await handlePage(req, res, context);

    res.send(page);
  } catch (e) {
    console.log(e);
  }
}
