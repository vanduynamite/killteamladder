class CreateOrderItems < ActiveRecord::Migration[5.2]
  def change
    create_table :order_items do |t|
      t.integer :user_id, null: false
      t.integer :quantity, null: false, default: 1
      t.string :name, null: false
      t.integer :status_id, null: false
      t.integer :invoice_id
      t.integer :invoice_item_num
      t.integer :distributor_id, null: false
      t.integer :shipment_id
      t.string :item_id
      t.boolean :purchased_in_store, null: false, default: false

      t.timestamps
    end
  end
end
