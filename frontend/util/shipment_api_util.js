
export const newShipment = (shipment) => {

  // {
  //   tracking_num: 'abc123',
  //   distributor_id: 1,
  //   distributor_invoice: 'abc123',
  //   item_id_list: [1, 2, 3],
  // }

  if (shipment.trackingNum) shipment.tracking_num = shipment.trackingNum;
  if (shipment.distributorId && shipment.distributorId !== 'x') {
    shipment.distributor_id = shipment.distributorId;
  }
  if (shipment.distributorInvoice) shipment.distributor_invoice = shipment.distributorInvoice;
  shipment.item_id_list = shipment.itemIdList;

  return $.ajax({
    method: 'POST',
    url: '/api/shipments',
    data: { shipment },
  });
};
