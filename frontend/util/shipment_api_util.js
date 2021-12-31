
export const newShipment = (shipment) => {

  // {
  //   tracking_num: 'abc123',
  //   distributor_id: 1,
  //   distributor_invoice: 'abc123',
  //   item_id_list: [1, 2, 3],
  // }

  shipment.tracking_num = shipment.trackingNum;
  shipment.distributor_id = shipment.distributorId;
  shipment.distributor_invoice = shipment.distributorInvoice;
  shipment.item_id_list = shipment.itemIdList;

  return $.ajax({
    method: 'POST',
    url: '/api/shipments',
    data: { shipment },
  });
};
