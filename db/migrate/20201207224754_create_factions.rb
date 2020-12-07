class CreateFactions < ActiveRecord::Migration[5.2]
  def change
    create_table :factions do |t|
      t.string :faction_name, null: false
      t.integer :ladder_id, null: false

      t.timestamps
    end
  end
end
