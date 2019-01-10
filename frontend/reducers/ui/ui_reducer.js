import {
  SET_PATH_HISTORY,
  CLEAR_PATH_HISTORY
} from '../../actions/ui_actions';
import { merge } from 'lodash';

const uiReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case SET_PATH_HISTORY:
      return merge(newState, { history: action.data });

    case CLEAR_PATH_HISTORY:
      delete newState.history;
      return newState;

    default:
      return newState;
  }

};

export default uiReducer;
