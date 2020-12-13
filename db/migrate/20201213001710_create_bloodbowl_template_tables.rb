class CreateBloodbowlTemplateTables < ActiveRecord::Migration[5.2]
  def change
    create_table :bb_team_templates do |t|
      t.integer :faction_id, null: false
      t.integer :reroll_cost, null: false
      t.integer :tier, null: false
      t.boolean :apothecary, null: false, default: false

      t.timestamps
    end

    create_table :bb_special_rules do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps
    end

    create_table :bb_team_special_rules do |t|
      t.integer :bb_special_rule_id, null: false
      t.integer :bb_team_template_id, null: false

      t.timestamps
    end

    create_table :bb_skill_groups do |t|
      t.string :name, null:false

      t.timestamps
    end

    create_table :bb_skills do |t|
      t.integer :bb_skill_group_id, null: false
      t.string :name, null: false
      t.text :description
      t.boolean :must_use, null: false, default: false

      t.timestamps
    end

    create_table :bb_player_template do |t|
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

    create_table :bb_player_skill_group do |t|
      t.integer :bb_player_template_id, null: false
      t.integer :bb_skill_group_id, null: false
      t.boolean :primary, null: false, default: false

      t.timestamps
    end
  end
end
