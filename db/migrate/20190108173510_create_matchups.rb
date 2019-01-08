class CreateMatchups < ActiveRecord::Migration[5.2]
  def change
    create_table :matchups do |t|
      t.integer :team_id, null: false
      t.integer :start_points, null: false
      t.integer :end_points, null: false
      t.integer :result, null: false
      t.integer :match_up, null: false

      t.timestamps
    end

    add_index :matchups, :team_id
    add_index :matchups, :match_up
  end
end
