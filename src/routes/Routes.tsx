import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routesMap } from './routesMap';

export default () => (
  <Switch>
    {Object.entries(routesMap).map(([path, { Component }]) => (
      <Route
        key={path}
        path={path}
        exact
        render={props => <Component {...(props as any)} />}
      />
    ))}
  </Switch>
);
