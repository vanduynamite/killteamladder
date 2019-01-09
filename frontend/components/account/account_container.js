import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { getUser } from '../../actions/user_actions';
import Account from './account';

const msp = state => {
  const loggedIn = state.session.id !== undefined;
  const teams = state.entities.teams;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];
  
  return {
    loggedIn,
    currentUser,
    teams,
  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUser: id => dispatch(getUser(id)),
  };
};

export default connect(msp, mdp)(Account);
