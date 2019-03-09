class ChangeLadderToText < ActiveRecord::Migration[5.2]
  def change
    remove_index(:teams, :ladder_id)
    remove_column(:teams, :ladder_id)

    add_column(:teams, :ladder_name, :string)
    Team.update_all(ladder_name: '/killteam')
    change_column_null(:teams, :ladder_name, false)

    add_index(:teams, :ladder_name)
  end
end
