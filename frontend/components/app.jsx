import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import Login from './auth/login_container';
import Signup from './auth/signup_container';
import Main from './main/main_container';

export default () => {
  return (
    <Switch>
      <Route path='/' component={ Main } />
    </Switch>
  );
  // <AuthRoute exact path='/login' component={ Login } />
  // <AuthRoute exact path='/signup' component={ Signup } />
};
