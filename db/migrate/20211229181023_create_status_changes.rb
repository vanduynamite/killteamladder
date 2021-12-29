class CreateStatusChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :status_changes do |t|
      t.integer :order_item_id, null: false
      t.integer :old_status_id, null: false
      t.integer :new_status_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
