import { connect } from 'react-redux';
import { getTeams } from '../../actions/team_actions';
import Main from './main';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); console.log(ladder);

  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  const teams = state.entities.teams;
  const users = state.entities.users;

  return {
    ladder,
    loggedIn,
    currentUser,
    teams,
    users,
  };
};

const mdp = dispatch => {
  return {
    getTeams: () => dispatch(getTeams()),
  };
};

export default connect(msp, mdp)(Main);
