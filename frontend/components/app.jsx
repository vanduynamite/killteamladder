import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute,
 ProtectedRoute } from '../util/route_util';
import Background from './general/background';
import Nav from './nav/killteam_nav';
import Killteam from './killteam';
import Portal from './portal/portal_container';

export default () => {

  return (
    <>
      <Background />
      <Nav />
      <Switch>
        <Route path='/killteam' component={ Killteam } />
        <Route path='/' component={ Portal } />
      </Switch>
    </>
  );
};
