class CreateShipments < ActiveRecord::Migration[5.2]
  def change
    create_table :shipments do |t|
      t.string :tracking_num, null: true
      t.integer :distributor_id, null: false
      t.string :distributor_invoice, null: true
      t.date :received, null: true

      t.timestamps
    end
  end
end
