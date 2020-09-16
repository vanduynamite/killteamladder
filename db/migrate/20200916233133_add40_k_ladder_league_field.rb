class Add40KLadderLeagueField < ActiveRecord::Migration[5.2]
  def change
    add_column(:users, :authorized_2020_league, :boolean, null: false, default: false)
  end
end
