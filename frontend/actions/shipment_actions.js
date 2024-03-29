import * as ShipmentAPI from '../util/shipment_api_util';

export const RECEIVE_SHIPMENT = 'RECEIVE_SHIPMENT';
export const RECEIVE_SHIPMENT_ERRORS = 'RECEIVE_SHIPMENT_ERRORS';

const receiveShipment = (data) => {
  return {
    type: RECEIVE_SHIPMENT,
    shipments: data.shipments,
    orderItems: data.orderItems,
  };
};

const receiveShipmentErrors = (errors) => {
  return {
    type: RECEIVE_SHIPMENT_ERRORS,
    errors: errors,
  };
};

export const newShipment = (shipment, historyPush, path) => (dispatch) => {
  return ShipmentAPI.newShipment(shipment).then(
    (payload) => {
      dispatch(receiveShipment(payload));
      if (historyPush) historyPush(path);
    },
    (errors) => dispatch(receiveShipmentErrors(errors))
  );
};
