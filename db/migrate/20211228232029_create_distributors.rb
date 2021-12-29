class CreateDistributors < ActiveRecord::Migration[5.2]
  def change
    create_table :distributors do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_index :distributors, :name, unique: true
  end
end
