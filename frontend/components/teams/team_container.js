import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTeam } from '../../actions/team_actions';
import { setPathHistory,
  clearPathHistory
} from '../../actions/ui_actions';
import Team from './team';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); //console.log(ladder);
  const teams = state.entities.teams;
  const matches = state.entities.matches;
  const users = state.entities.users;
  const factions = state.entities.factions;
  const players = state.entities.players;

  let currentUser;
  if (state.session.id) currentUser = state.entities.users[state.session.id];

  let currentTeam;
  const currentTeamId = ownProps.match.params.teamId;
  currentTeam = state.entities.teams[currentTeamId];

  const ownerViewing = currentUser && currentTeam ?
    currentUser.id === currentTeam.userId :
    false;


  let cameFromNewMatch;
  if (state.ui.history) cameFromNewMatch = state.ui.history.match;

  return {
    ladder,
    currentUser,
    currentTeam,
    currentTeamId,
    ownerViewing,
    cameFromNewMatch,
    teams,
    matches,
    users,
    factions,
    players,
  };
};

const mdp = dispatch => {
  return {
    getTeam: id => dispatch(getTeam(id)),
    setPathHistory: data => dispatch(setPathHistory(data)),
    clearPathHistory: () => dispatch(clearPathHistory()),
  };
};

export default withRouter(connect(msp, mdp)(Team));
