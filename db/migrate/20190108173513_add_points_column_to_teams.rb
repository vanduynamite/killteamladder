class AddPointsColumnToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column(:teams, :points, :integer, null: false, default: 0)
  end
end
