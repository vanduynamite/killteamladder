class CreateBbPlayerTables < ActiveRecord::Migration[5.2]
  def change
    add_column(:bb_teams, :assistant_coaches, :integer, null: false, default: 0)
    add_column(:bb_teams, :cheerleaders, :integer, null: false, default: 0)
    add_column(:bb_teams, :apothecaries, :integer, null: false, default: 0)

    create_table :bb_players do |t|
      t.integer :team_id, null: false
      t.integer :bb_player_template_id, null: false
      t.string :position_name, null: false
      t.string :name, null: false
      t.integer :number, null: false
      t.integer :ma_original, null: false
      t.integer :st_original, null: false
      t.integer :ag_original, null: false
      t.integer :pa_original, null: false
      t.integer :av_original, null: false
      t.integer :hiring_fee, null: false
      t.integer :current_value, null: false
      t.integer :ma_improvement, null: false, default: 0
      t.integer :st_improvement, null: false, default: 0
      t.integer :ag_improvement, null: false, default: 0
      t.integer :pa_improvement, null: false, default: 0
      t.integer :av_improvement, null: false, default: 0
      t.integer :spp, null: false, default: 0
      t.boolean :mng, null: false, default: false
      t.integer :ni, null: false, default: 0
      t.boolean :temporarily_retired, null: false, default: false

      t.timestamps
    end

    create_table :bb_player_skills do |t|
      t.integer :bb_player_id, null: false
      t.integer :bb_skill_id, null: false
      t.string :modifier

      t.timestamps
    end

    create_table :bb_position_group_limits do |t|
      t.string :name, null: false
      t.integer :max, null: false

      t.timestamps
    end

    create_table :bb_position_groups do |t|
      t.integer :bb_position_group_limits_id, null: false
      t.integer :bb_player_template_id, null: false

      t.timestamps
    end
  end
end
