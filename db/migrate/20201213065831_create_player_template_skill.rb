class CreatePlayerTemplateSkill < ActiveRecord::Migration[5.2]
  def change
    create_table :bb_player_template_skills do |t|
      t.integer :bb_player_template_id, null: false
      t.integer :bb_skill_id, null: false
      t.string :modifier

      t.timestamps
    end
  end
end
