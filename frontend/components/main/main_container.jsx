import { connect } from 'react-redux';
import { getTeams } from '../../actions/team_actions';
import { clearPathHistory } from '../../actions/ui_actions';
import Main from './main';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));

  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  const teams = state.entities.teams;
  const users = state.entities.users;
  const factions = state.entities.factions;

  return {
    ladder,
    loggedIn,
    currentUser,
    teams,
    users,
    factions,
  };
};

const mdp = dispatch => {
  return {
    getTeams: (ladder) => dispatch(getTeams(ladder)),
    clearPathHistory: () => dispatch(clearPathHistory()),
  };
};

export default connect(msp, mdp)(Main);
