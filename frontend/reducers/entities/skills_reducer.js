import { RECEIVE_ADVANCEMENTS } from '../../actions/advancement_actions';
import { merge } from 'lodash';

const skillsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_ADVANCEMENTS:
      return merge(newState, action.skills);

    default:
      return newState;
  }

};

export default skillsReducer;
