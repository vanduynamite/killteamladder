import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditPlayers from './edit_players';
import {
  getPlayersAndTemplates,
} from '../../actions/player_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); //console.log(ladder);
  const errors = state.errors.teams || {};
  const teamId = ownProps.match.params.teamId;
  const team = state.entities.teams[teamId];
  const players = state.entities.players;
  const templates = state.entities.templates;

  let ownerId;
  if (team) ownerId = team.userId;
  let currentUser;
  if (state.session.id) currentUser = state.entities.users[state.session.id];

  let currentTeam;
  const currentTeamId = ownProps.match.params.teamId;
  currentTeam = state.entities.teams[currentTeamId];
  const ownerViewing = currentUser && currentTeam ?
    currentUser.id === currentTeam.userId :
    false;

  return {
    ladder,
    errors,
    teamId,
    team,
    ownerId,
    players,
    currentTeam,
    ownerViewing,
    templates,
  };
};

const mdp = dispatch => {
  return {
    getPlayersAndTemplates: teamId => dispatch(getPlayersAndTemplates(teamId)),
  };
};

export default withRouter(connect(msp, mdp)(EditPlayers));
