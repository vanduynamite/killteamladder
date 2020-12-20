import { RECEIVE_TEAMS } from '../../actions/team_actions';
import { RECEIVE_PLAYER, RECEIVE_PLAYERS } from '../../actions/player_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_TEAMS:
    case RECEIVE_PLAYER:
    case RECEIVE_PLAYERS:
      return merge(newState, action.players);

    default:
      return newState;
  }

};

export default userReducer;
