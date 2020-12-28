class AddBooleansToAdvancementsTable < ActiveRecord::Migration[5.2]
  def change
    add_column(:bb_advancements, :requires_skill_id, :boolean, default: false, null: false)
    add_column(:bb_advancements, :stat_upgrade, :boolean, default: false, null: false)
  end
end
