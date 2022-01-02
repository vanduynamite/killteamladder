import {RECEIVE_INVOICE} from '../../actions/invoice_actions';
import {RECEIVE_SHIPMENT} from '../../actions/shipment_actions';
import {RECEIVE_ITEM_NOTES} from '../../actions/item_note_actions';
import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const orderItemReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_INVOICE:
    case RECEIVE_SHIPMENT:
    case RECEIVE_ITEM_NOTES:
    case RECEIVE_ORDER_ITEMS:
      return merge(newState, action.orderItems);

    default:
      return newState;
  }

};

export default orderItemReducer;
