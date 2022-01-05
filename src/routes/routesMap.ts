import React from 'react';
import { App } from '../components/App/App';

type RoutesMap = Record<
  string,
  {
    Component: () => React.ReactElement;
  }
>;

export const routesMap: RoutesMap = {
  '/': {
    Component: App,
  },
};
