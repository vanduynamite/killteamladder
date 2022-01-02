import {RECEIVE_INVOICE_ERRORS, RECEIVE_INVOICE} from '../../actions/invoice_actions';
import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const invoicesErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_INVOICE_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_INVOICE:
    case RECEIVE_ORDER_ITEMS:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "Not all of these items belong to the same user": "itemIdList",
  "Not all of these items are awaiting invoice": "itemIdList",
  "Carcosa number has already been taken": "carcosaId",
  "Carcosa number can't be blank": "carcosaId",
};

export default invoicesErrorsReducer;
