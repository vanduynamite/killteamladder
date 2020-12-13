class CreateBbTeams < ActiveRecord::Migration[5.2]
  def change
    drop_table :bb_team
    
    create_table :bb_teams do |t|
      t.integer :team_id, null: false
      t.integer :rerolls, null: false, default: 0
      t.integer :dedicated_fans, null: false, default: 1
      t.integer :treasury, null: false, default: 1000000
      t.integer :team_value, null: false, default: 0
      t.integer :current_team_value, null: false, default: 0
    end
  end
end
