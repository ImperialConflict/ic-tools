import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes

import FleetForm from './fleet';
import PageNotFound from './common/PageNotFound';

export default (
  <Switch>

    <Route path="/fleet" component={FleetForm}/>
    <Route component={PageNotFound} />
  </Switch>
);