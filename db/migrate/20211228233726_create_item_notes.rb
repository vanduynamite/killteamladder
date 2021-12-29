class CreateItemNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :item_notes do |t|
      t.integer :item_note_id, null: false
      t.string :note, null: false

      t.timestamps
    end
  end
end
