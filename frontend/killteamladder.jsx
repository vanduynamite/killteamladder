import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { merge } from 'lodash';
import * as Actions from './actions/comment_actions';

const loadCurrentUser = ({ users, session }) => {
  return {
    entities: { users },
    session: {
      id: session
    },
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const prevUserState = window.currentUser ? loadCurrentUser(window.currentUser) : {};

  const store = configureStore(prevUserState);
  const root = document.getElementById('root');
  // window.merge = merge;
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.actions = Actions;

  // ReactDOM.render(<Root store={ store } />, root);
  ReactDOM.render(<h1>CARCOSA KILL TEAM LADDER</h1>, root);
});
