import { RECEIVE_FACTIONS } from '../../actions/team_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_FACTIONS:
      return merge(newState, action.factions);

    default:
      return newState;
  }

};

export default userReducer;
