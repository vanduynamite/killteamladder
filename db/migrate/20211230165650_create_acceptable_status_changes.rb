class CreateAcceptableStatusChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :acceptable_status_changes do |t|
      t.integer :order_status_id_from, null: false
      t.integer :order_status_id_to, null: false
      t.boolean :ordermaster_only, null: false, default: true
    end
  end
end
