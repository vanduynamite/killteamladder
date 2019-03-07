import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute,
 ProtectedRoute } from '../util/route_util';
import Background from './general/background';
import Nav from './nav/killteam_nav';
import Ladder from './ladder';
import Portal from './portal/portal_container';

export default () => {

  return (
    <>
      <Background />
      <Nav />
      <Switch>
        <Route path='/killteam' component={ Ladder } />
        <Route path='/underworlds' component={ Ladder } />
        <Route path='/' component={ Portal } />
      </Switch>
    </>
  );
};
