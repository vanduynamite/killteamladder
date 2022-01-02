import {RECEIVE_SHIPMENT_ERRORS, RECEIVE_SHIPMENT} from '../../actions/shipment_actions';
import {RECEIVE_ORDER_ITEMS} from '../../actions/order_item_actions';
import {merge} from 'lodash';

const shipmentsErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_SHIPMENT_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_SHIPMENT:
    case RECEIVE_ORDER_ITEMS:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "Some of these items are in an invalid status": "itemIdList",
  "Not all the items on this shipment are from the same distributor": "distributorId",
  "The items on this shipment are for the wrong distibutor": "distributorId",
};

export default shipmentsErrorsReducer;
