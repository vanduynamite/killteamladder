# == Schema Information
#
# Table name: teams
#
#  id          :bigint           not null, primary key
#  active      :boolean          default(TRUE), not null
#  faction     :string           not null
#  ladder_name :string           not null
#  points      :integer          default(0), not null
#  team_name   :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  faction_id  :integer          not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_teams_on_ladder_name  (ladder_name)
#  index_teams_on_team_name    (team_name) UNIQUE
#  index_teams_on_user_id      (user_id)
#

class Team < ApplicationRecord
  validates :faction, :team_name, presence: true
  validates :team_name, uniqueness: true, length: { maximum: 40 }
  validates :user_id, uniqueness: { scope: [:faction_id, :ladder],
   message: 'already has a team in this faction' }

  belongs_to :user

  belongs_to :faction_record,
    class_name: :Faction,
    foreign_key: :faction_id

  belongs_to :ladder,
    class_name: :Ladder,
    foreign_key: :ladder_name,
    primary_key: :name

  has_many :matchups,
    dependent: :destroy

  has_many :players, class_name: :BbPlayer

  after_initialize :add_start_points, if: :new_record?
  after_create :maybe_create_bb_team

  def add_start_points
    # self.points = 1000

    all_points = Team.where(active: true).pluck(:points).sort
    if all_points.length == 0 then
      self.points = 1000
    else
      self.points = all_points[all_points.length / 4]
    end
  end

  def stats
    current_season_num = Season.where(ladder_name: self.ladder_name).last.season
    all_matches = self.matchups.where(season: current_season_num)
    results = {
      matchesPlayed: 0,
      matchesWon: 0,
      matchesTied: 0,
      matchesLost: 0,
    }

    all_matches.each do |match|
      results[:matchesPlayed] += 1
      results[:matchesWon] += 1 if match.result == 1
      results[:matchesTied] += 1 if match.result == 0
      results[:matchesLost] += 1 if match.result == -1
    end

    results
  end

  def maybe_create_bb_team
    if self.ladder_name = '/bloodbowl'
      BbTeam.create(team_id: self.id)
    end
  end

end
