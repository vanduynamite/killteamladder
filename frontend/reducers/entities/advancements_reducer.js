import { RECEIVE_ADVANCEMENTS } from '../../actions/advancement_actions';
import { RECEIVE_PLAYERS } from '../../actions/player_actions';
import { merge } from 'lodash';

const advancementReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_ADVANCEMENTS:
      return merge(newState, action.advancements);

    case RECEIVE_PLAYERS:
      return newState;

    default:
      return newState;
  }

};

export default advancementReducer;
