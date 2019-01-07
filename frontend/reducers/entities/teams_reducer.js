import { RECEIVE_TEAMS } from '../../actions/teams_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_TEAMS:
      return merge(newState, action.teams);

    default:
      return newState;
  }

};

export default userReducer;
