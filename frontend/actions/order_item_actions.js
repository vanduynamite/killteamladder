import * as OrderItemAPI from '../util/order_item_api_util';

export const RECEIVE_ORDER_ITEMS = 'RECEIVE_ORDER_ITEMS';
export const RECEIVE_ORDER_ITEM_ERRORS = 'RECEIVE_ORDER_ITEM_ERRORS';

const receiveOrderItems = (data) => {
  return {
    type: RECEIVE_ORDER_ITEMS,
    orderItems: data.orderItems,
    distributors: data.distributors,
    invoices: data.invoices,
    shipments: data.shipments,
    itemNotes: data.itemNotes,
    users: data.users,
    orderStatuses: data.orderStatuses,
    changeLinks: data.changeLinks,
  };
};

const receiveOrderItemErrors = (errors) => {
  return {
    type: RECEIVE_ORDER_ITEM_ERRORS,
    errors: errors,
  };
};

export const getItems = () => (dispatch) => {
  return OrderItemAPI.getItems().then(
    (payload) => dispatch(receiveOrderItems(payload))
  );
};

export const getOrdermasterItems = (subset) => (dispatch) => {
  return OrderItemAPI.getOrdermasterItems(subset).then(
    (payload) => dispatch(receiveOrderItems(payload))
  );
};

export const newItems = (items) => (dispatch) => {
  return OrderItemAPI.newItems(items).then(
    (payload) => dispatch(receiveOrderItems(payload)),
    (errors) => dispatch(receiveOrderItemErrors(errors))
  );
};

export const editItems = (items) => (dispatch) => {
  return OrderItemAPI.editItems(items).then(
    (payload) => dispatch(receiveOrderItems(payload)),
    (errors) => dispatch(receiveOrderItemErrors(errors))
  );
};
