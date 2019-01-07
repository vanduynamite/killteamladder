class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.integer :user_id, null: false
      t.string :faction, null: false
      t.string :team_name, null: false
      t.boolean :active, null: false, default: true

      t.timestamps
    end

    add_index :teams, :user_id
    add_index :teams, :team_name, unique: true
  end

end
