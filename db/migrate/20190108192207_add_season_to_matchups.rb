class AddSeasonToMatchups < ActiveRecord::Migration[5.2]
  def change
    add_column(:matchups, :season, :integer, null: false, default: 1)
    add_index :matchups, :season
  end
end
