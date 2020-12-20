import { RECEIVE_TEAMS } from '../../actions/team_actions';
import { RECEIVE_USERS } from '../../actions/user_actions';
import { RECEIVE_PLAYERS } from '../../actions/player_actions';
import { RECEIVE_DELETED_MATCH } from '../../actions/match_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_USERS:
    case RECEIVE_TEAMS:
    case RECEIVE_PLAYERS:
      return merge(newState, action.teams);

    case RECEIVE_DELETED_MATCH:
      delete newState[action.teamIds[0]].matchIds;
      delete newState[action.teamIds[1]].matchIds;
      return newState;

    default:
      return newState;
  }

};

export default userReducer;
