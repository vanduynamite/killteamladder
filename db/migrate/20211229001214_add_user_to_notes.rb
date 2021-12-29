class AddUserToNotes < ActiveRecord::Migration[5.2]
  def change
    add_column(:item_notes, :user_id, :integer, null: false)
  end
end
