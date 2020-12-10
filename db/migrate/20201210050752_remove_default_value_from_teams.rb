class RemoveDefaultValueFromTeams < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:teams, :faction_id, nil)
  end
end
