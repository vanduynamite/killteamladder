import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { merge } from 'lodash';

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

  // window.getState = store.getState;
  // window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={ store } />, root);
});
