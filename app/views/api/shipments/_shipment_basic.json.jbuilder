json.shipments do
  json.set! shipment.id do
    json.id shipment.id
    json.trackingNum shipment.tracking_num
    json.distributorId shipment.distributor_id
    json.distributorInvoice shipment.distributorInvoice
  end
end
