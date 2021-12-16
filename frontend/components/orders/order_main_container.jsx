import { connect } from 'react-redux';
import { clearPathHistory } from '../../actions/ui_actions';
import Main from './order_main';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];
  const users = state.entities.users;

  return {
    loggedIn,
    currentUser,
    users,
  };
};

const mdp = dispatch => {
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
  };
};

export default connect(msp, mdp)(Main);
