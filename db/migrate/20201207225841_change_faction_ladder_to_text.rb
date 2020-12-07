class ChangeFactionLadderToText < ActiveRecord::Migration[5.2]
  def change
    remove_column(:factions, :ladder_id)

    add_column(:factions, :ladder_name, :string, null: false)
  end
end
