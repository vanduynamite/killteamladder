import {
  withRouter,
  Route,
  Component,
  Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const Auth = ({component: Component, path, loggedIn, exact, history}) => {
  return (
    <Route path={path} exact={exact} render={(props) => {
        if (loggedIn) {
          return <Redirect to='/killteam/' />
        } else {
          return <Component {...props} />
        }
      }
    }/>
  );
}

const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={(props) => {
      return loggedIn
        ? <Component {...props} />
      : <Redirect to='/killteam/login' />
      }
    }/>
  );
}

const msp = state => {
  return {loggedIn: Boolean(state.session.id)};
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));
export const ProtectedRoute = withRouter(connect(msp, null)(Protected));
