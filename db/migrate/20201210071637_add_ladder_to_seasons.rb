class AddLadderToSeasons < ActiveRecord::Migration[5.2]
  def change
    add_column(:seasons, :ladder_name, :string)
  end
end
