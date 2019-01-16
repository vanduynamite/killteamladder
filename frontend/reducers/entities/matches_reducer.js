import { RECEIVE_TEAMS } from '../../actions/team_actions';
import { RECEIVE_DELETED_MATCH } from '../../actions/match_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_DELETED_MATCH:
      delete newState[action.matchIds[0]];
      delete newState[action.matchIds[1]];
      return newState;

    case RECEIVE_TEAMS:
      return merge(newState, action.matches);

    default:
      return newState;
  }

};

export default userReducer;
