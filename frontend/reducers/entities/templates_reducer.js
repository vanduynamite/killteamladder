import { RECEIVE_PLAYERS } from '../../actions/player_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_PLAYERS:
      return merge(newState, action.templates);

    default:
      return newState;
  }

};

export default userReducer;
