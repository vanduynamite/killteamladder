import {SET_PATH_HISTORY, CLEAR_PATH_HISTORY, TOGGLE_CHECKED_ITEM, CLEAR_CHECKED_ITEMS} from '../../actions/ui_actions';
import {merge} from 'lodash';

const uiReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case SET_PATH_HISTORY:
      return merge(newState, {history: action.data});

    case CLEAR_PATH_HISTORY:
      delete newState.history;
      return newState;

    case TOGGLE_CHECKED_ITEM:
      const itemId = action.data;
      const checkedItems = newState.checkedItems || {};
      checkedItems[itemId] = !checkedItems[itemId];
      return merge(newState, {checkedItems: checkedItems});

    case CLEAR_CHECKED_ITEMS:
      delete newState.checkedItems;
      return merge(newState, {checkedItems: {}});

    default:
      return newState;
  }

};

export default uiReducer;
