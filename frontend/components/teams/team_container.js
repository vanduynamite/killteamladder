import { connect } from 'react-redux';
import { getTeam } from '../../actions/team_actions';
import Team from './team';

const msp = (state, ownProps) => {
  const teams = state.entities.teams;
  const matches = state.entities.matches;
  const users = state.entities.users;

  let currentUser;
  if (state.session.id) currentUser = state.entities.users[state.session.id];

  let currentTeam;
  const currentTeamId = ownProps.match.params.teamId;
  currentTeam = state.entities.teams[currentTeamId];

  const ownerViewing = currentUser && currentTeam ?
    currentUser.id === currentTeam.userId :
    false;

  return {
    currentUser,
    currentTeam,
    currentTeamId,
    ownerViewing,
    teams,
    matches,
    users,
  };
};

const mdp = dispatch => {
  return {
    getTeam: id => dispatch(getTeam(id)),
  };
};

export default connect(msp, mdp)(Team);
