class FixItemNoteField < ActiveRecord::Migration[5.2]
  def change
    remove_column(:item_notes, :item_note_id)
    add_column(:item_notes, :order_item_id, :integer, null: false)
  end
end
