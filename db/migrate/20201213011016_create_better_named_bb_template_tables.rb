class CreateBetterNamedBbTemplateTables < ActiveRecord::Migration[5.2]
  def change
    drop_table :bb_player_template
    drop_table :bb_player_skill_group

    create_table :bb_player_templates do |t|
      t.integer :bb_team_template_id, null: false
      t.string :position_name, null: false
      t.integer :max_allowed, null: false
      t.integer :cost, null: false
      t.integer :ma, null: false
      t.integer :st, null: false
      t.integer :ag, null: false
      t.integer :pa
      t.integer :av, null: false

      t.timestamps
    end

    create_table :bb_player_skill_groups do |t|
      t.integer :bb_player_template_id, null: false
      t.integer :bb_skill_group_id, null: false
      t.boolean :primary, null: false, default: false

      t.timestamps
    end
  end
end
