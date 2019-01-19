# == Schema Information
#
# Table name: teams
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  faction    :string           not null
#  team_name  :string           not null
#  active     :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  points     :integer          default(0), not null
#

class Team < ApplicationRecord
  FACTION_LIST = [
    'Adeptus Astartes',
    'Adeptus Mechanicus',
    'Astra Militarum',
    'Asuryani',
    'Death Guard',
    'Deathwatch',
    'Drukhari',
    'Elucidean Starstriders',
    'Gellerpox Infected',
    'Genestealer Cults',
    'Grey Knights',
    'Harlequins',
    'Heretic Astartes',
    'Kroot',
    'Necrons',
    'Orks',
    'Servants of the Abyss',
    'T\'au Empire',
    'Thousand Sons',
    'Tyranids',
  ]

  validates :faction, :team_name, presence: true
  validates :team_name, uniqueness: true, length: { maximum: 40 }
  validates :faction, :inclusion=> { :in => FACTION_LIST }
  validates :user_id, uniqueness: { scope: [:faction],
   message: 'already has a team in this faction' }

  belongs_to :user

  has_many :matchups,
    dependent: :destroy

  after_initialize :add_start_points, if: :new_record?

  def add_start_points
    # self.points = 1000

    all_points = Team.where(active: true).pluck(:points).sort
    if all_points.length == 0 then
      self.points = 1000
    else
      self.points = all_points[all_points.length / 4] - 1
    end
  end

  def plays
    self.matchups.where(season: Matchup.season).count
  end

  def wins
    self.matchups.where(result: 1, season: Matchup.season).count
  end

  def losses
    self.matchups.where(result: -1, season: Matchup.season).count
  end

  def ties
    self.matchups.where(result: 0, season: Matchup.season).count
  end

end
