import {RECEIVE_INVOICE} from '../../actions/invoice_actions';
import {RECEIVE_SHIPMENT} from '../../actions/shipment_actions';
import {RECEIVE_ORDER_ITEM_ERRORS, RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import { merge } from 'lodash';

const orderItemsErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_ORDER_ITEM_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_INVOICE:
    case RECEIVE_SHIPMENT:
    case RECEIVE_ORDER_ITEMS:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "Mismatch on length of item data": "nameList",
  "Not all items can be updated to the new status": "statusId",
};

export default orderItemsErrorsReducer;
