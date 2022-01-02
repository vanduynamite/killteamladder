import {RECEIVE_DISTRIBUTORS} from '../../actions/distributor_actions';
import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const distributorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_DISTRIBUTORS:
    case RECEIVE_ORDER_ITEMS:
      return merge(newState, action.distributors);

    default:
      return newState;
  }

};

export default distributorsReducer;
