import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { getUser } from '../../actions/user_actions';
import Account from './account';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const teams = state.entities.teams;
  const factions = state.entities.factions;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  return {
    ladder,
    loggedIn,
    currentUser,
    teams,
    factions,
  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUser: (id, ladder) => dispatch(getUser(id, ladder)),
  };
};

export default connect(msp, mdp)(Account);
