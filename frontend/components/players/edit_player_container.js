import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditPlayer from './edit_player';
import { getPlayersAndTemplates, editPlayer } from '../../actions/player_actions';
import { getAdvancements } from '../../actions/advancement_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const errors = state.errors.players || {};
  const teamId = ownProps.match.params.teamId;
  const playerId = ownProps.match.params.playerId;
  const team = state.entities.teams[teamId];
  const player = state.entities.players[playerId];
  const players = state.entities.players;

  let ownerId;
  if (team) ownerId = team.userId;
  let currentUserId;
  if (state.session.id) currentUserId = state.session.id;

  return {
    ladder,
    errors,
    teamId,
    team,
    currentUserId,
    ownerId,
    playerId,
    player,
    players,
  };
};

const mdp = dispatch => {
  return {
    getPlayersAndTemplates: teamId => dispatch(getPlayersAndTemplates(teamId)),
    getAdvancements: playerId => dispatch(getAdvancements(playerId)),
    formAction: (player, historyPush) => dispatch(editPlayer(player, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(EditPlayer));
