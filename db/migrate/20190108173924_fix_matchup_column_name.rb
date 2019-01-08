class FixMatchupColumnName < ActiveRecord::Migration[5.2]
  def change
    remove_column(:matchups, :match_up)
    add_column(:matchups, :matchup_id, :integer, null: false)
  end
end
