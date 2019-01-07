import {
  RECEIVE_CURRENT_USER,
  REMOVE_CURRENT_USER
} from '../../actions/session_actions';
import { RECEIVE_USERS } from '../../actions/user_actions';
import { RECEIVE_TEAMS } from '../../actions/team_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_TEAMS:
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USERS:
      return merge(newState, action.users);

    case REMOVE_CURRENT_USER:
      return merge(newState, {});

    default:
      return newState;
  }

};

export default userReducer;
