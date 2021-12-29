class CreateOrderStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :order_statuses do |t|
      t.string :name, null: false
      t.integer :sort_num, null: false
      t.boolean :user_visible, null: false, default: true
      t.boolean :item_cancelable, null: false, default: false

      t.timestamps
    end

    add_index :order_statuses, :name, unique: true
  end
end
