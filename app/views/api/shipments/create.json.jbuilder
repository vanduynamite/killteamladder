
json.partial! 'api/shipments/shipment_basic.json.jbuilder', shipment: @shipment

@items.each do |item|
  json.partial! 'api/order_items/order_item_basic.json.jbuilder', order_item: item
end
