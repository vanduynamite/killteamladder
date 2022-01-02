import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const changeLinksReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_ORDER_ITEMS:
      return merge(newState, action.changeLinks);

    default:
      return newState;
  }

};

export default changeLinksReducer;
