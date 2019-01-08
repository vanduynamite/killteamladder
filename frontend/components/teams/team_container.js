import { connect } from 'react-redux';
import { getTeam } from '../../actions/team_actions';
import Team from './team';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined;
  const teams = state.entities.teams;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];
  const currentTeamId = ownProps.match.params.teamId;

  return {
    loggedIn,
    currentUser,
    teams,
    currentTeamId,
  };
};

const mdp = dispatch => {
  return {
    getTeam: id => dispatch(getTeam(id)),
  };
};

export default connect(msp, mdp)(Team);
