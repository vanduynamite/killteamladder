
@notes.each do |note|
  json.partial! 'api/item_notes/item_note_basic.json.jbuilder'
end

@items.each do |item|
  json.partial! 'api/order_items/order_item_basic.json.jbuilder', order_item: item
end
