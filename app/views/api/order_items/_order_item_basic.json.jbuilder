json.orderItems do
  json.set! order_item.id do
    json.id order_item.id
    json.userId order_item.user_id
    json.name order_item.name
    json.quantity order_item.quantity
    json.distributorId order_item.distributor_id
    json.statusId order_item.status_id
    json.inStorePurchase order_item.purchased_in_store
    json.invoiceId order_item.invoice_id if order_item.invoice_id
    json.invoiceItemNum order_item.invoice_item_num if order_item.invoice_item_num
    json.shipmentId order_item.shipment_id if order_item.shipment_id
    json.itemCode order_item.item_code if order_item.item_code
    json.noteIds order_item.notes.pluck(:id)
  end
end
