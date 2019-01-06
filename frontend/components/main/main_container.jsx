import { connect } from 'react-redux';
import Main from './main';

const msp = state => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  return {
    loggedIn,
    currentUser,
  };
};

const mdp = dispatch => {
  return {

  };
};

export default connect(msp, mdp)(Main);
