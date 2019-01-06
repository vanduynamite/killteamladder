import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Account from './account';

const msp = state => {
  const loggedIn = state.session.id !== undefined;
  let currentUser = undefined;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  return {
    loggedIn,
    currentUser,
  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(msp, mdp)(Account);
