import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute,
 ProtectedRoute } from '../util/route_util';
import Background from './general/background';
import Nav from './nav/nav';
import Ladder from './ladder';
import Portal from './portal/portal_container';
import Login from './auth/login_container';
import Signup from './auth/signup_container';

export default () => {

  return (
    <>
      <Background />
      <Nav />
      <Switch>
        <AuthRoute exact path={ '/carcosa/login' } component={ Login } />
        <AuthRoute exact path={ '/carcosa/signup' } component={ Signup } />
        <Route path='/killteam' component={ Ladder } />
        <Route path='/underworlds' component={ Ladder } />
        <Route path='/' component={ Portal } />
      </Switch>
    </>
  );
};
