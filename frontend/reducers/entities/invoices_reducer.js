import {RECEIVE_INVOICE} from '../../actions/invoice_actions';
import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const invoiceReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_INVOICE:
    case RECEIVE_ORDER_ITEMS:
      return merge(newState, action.invoices);

    default:
      return newState;
  }

};

export default invoiceReducer;
