class AddMoreBooleansToAdvancements < ActiveRecord::Migration[5.2]
  def change
    add_column(:bb_advancements, :random, :boolean, default: false, null: false)
    add_column(:bb_advancements, :primary_skill, :boolean, default: false, null: false)
  end
end
