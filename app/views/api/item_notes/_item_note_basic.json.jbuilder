json.itemNotes do
  json.set! note.id do
    json.id note.id
    json.itemId note.order_item_id
    json.userId note.user_id
    json.note note.note
    json.created note.created_at
  end
end
