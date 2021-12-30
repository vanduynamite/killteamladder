
json.partial! 'api/invoices/invoice_basic.json.jbuilder', invoice: @invoice

@items.each do |item|
  json.partial! 'api/order_items/order_item_basic.json.jbuilder', order_item: item
end
