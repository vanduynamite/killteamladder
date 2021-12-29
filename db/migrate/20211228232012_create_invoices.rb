class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.string :carcosa_id, null: false
      t.string :square_id, null: true

      t.timestamps
    end

    add_index :invoices, :carcosa_id, unique: true
    add_index :invoices, :square_id, unique: true
  end
end
