import {RECEIVE_SHIPMENT} from '../../actions/shipment_actions';
import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const shipmentReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SHIPMENT:
    case RECEIVE_ORDER_ITEMS:
      return merge(newState, action.shipments);

    default:
      return newState;
  }

};

export default shipmentReducer;
