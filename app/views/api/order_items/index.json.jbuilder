
distributors = Distributor.where(items: @items)
invoices = Invoice.where(items: @items)
shipments = Shipment.where(items: @items)
notes = ItemNote.where(item: @items)
users = User.where(item_notes: notes).or(User.where(id: @user.id)).or(User.where(items: @items))
statuses = OrderStatus.all.includes(:acceptable_status_change_links)
status_changes = @user.permissions.ordermaster ?
  AcceptableStatusChange.all :
  AcceptableStatusChange.where(ordermaster_only: false)

@items.each do |item|
  json.partial! 'api/order_items/order_item_basic.json.jbuilder', order_item: item
end

distributors.each do |distributor|
  json.partial! 'api/distributors/distributor_basic.json.jbuilder', distributor: distributor
end

invoices.each do |invoice|
  json.partial! 'api/invoices/invoice_basic.json.jbuilder', invoice: invoice
end

shipments.each do |shipment|
  json.partial! 'api/shipments/shipment_basic.json.jbuilder', shipment: shipment
end

notes.each do |note|
  json.partial! 'api/item_notes/item_note_basic.json.jbuilder', note: note
end

users.each do |user|
  json.partial! 'api/users/user_basic.json.jbuilder', user: user
end

statuses.each do |status|
  json.partial! 'api/order_statuses/order_status_basic.json.jbuilder', status: status
end

status_changes.each do |status_change|
  json.partial! 'api/acceptable_status_changes/acceptable_status_change_basic.json.jbuilder', status_change: status_change
end
