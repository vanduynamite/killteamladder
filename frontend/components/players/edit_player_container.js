import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditPlayer from './edit_player';
import { getPlayer, editPlayer } from '../../actions/player_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const errors = state.errors.player || {};
  const teamId = ownProps.match.params.teamId;
  const playerId = ownProps.match.params.playerId;
  const team = state.entities.teams[teamId];

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
  };
};

const mdp = dispatch => {
  return {
    getPlayer: id => dispatch(getPlayer(id)),
    editPlayer: (player, historyPush) => dispatch(editPlayer(player, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(EditPlayer));
