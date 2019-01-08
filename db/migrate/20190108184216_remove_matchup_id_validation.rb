class RemoveMatchupIdValidation < ActiveRecord::Migration[5.2]
  def change
    remove_column(:matchups, :matchup_id)
    add_column(:matchups, :matchup_id, :integer)
  end
end
