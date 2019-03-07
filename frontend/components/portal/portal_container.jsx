import { connect } from 'react-redux';
import { getTeams } from '../../actions/team_actions';
import Portal from './portal';

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

export default connect(msp, mdp)(Portal);
