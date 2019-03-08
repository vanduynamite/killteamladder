class AddLadders < ActiveRecord::Migration[5.2]
  def change
    create_table :ladders do |t|
      t.string :name, null: false

      t.timestamps
    end
    
    add_column(:teams, :ladder_id, :integer)
    Team.update_all(ladder_id: 1)
    change_column_null(:teams, :ladder_id, false)

    add_index :teams, :ladder_id

  end
end
