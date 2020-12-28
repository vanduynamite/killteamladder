import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewAdvancement from './new_advancement';
import { getAdvancements, newAdvancement } from '../../actions/advancement_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const errors = state.errors.advancements || {};
  const playerId = ownProps.match.params.playerId;
  const player = state.entities.players[playerId];
  const advancements = state.entities.advancements;
  const skills = state.entities.skills;

  let ownerId;
  if (player) ownerId = player.userId;
  let currentUserId;
  if (state.session.id) currentUserId = state.session.id;

  return {
    ladder,
    errors,
    currentUserId,
    ownerId,
    playerId,
    player,
    advancements,
    skills,
  };
};

const mdp = dispatch => {
  return {
    getAdvancements: playerId => dispatch(getAdvancements(playerId)),
    newAdvancement: (advancement, historyPush) => dispatch(newAdvancement(advancement, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(NewAdvancement));
