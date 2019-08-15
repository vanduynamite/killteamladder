# == Schema Information
#
# Table name: teams
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer          not null
#  faction     :string           not null
#  team_name   :string           not null
#  active      :boolean          default(TRUE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  points      :integer          default(0), not null
#  ladder_name :string           not null
#

class Team < ApplicationRecord
  FACTION_LIST = [
    'Adeptus Astartes',
    'Adeptus Custodes',
    'Adeptus Mechanicus',
    'Aeldari',
    'Astra Militarum',
    'Asuryani',
    'Chaos',
    'Death Guard',
    'Deathwatch',
    'Drukhari',
    'Elucidean Starstriders',
    'Gellerpox Infected',
    'Genestealer Cults',
    'Grey Knights',
    'Harlequins',
    'Heretic Astartes',
    'Imperium',
    'Kroot',
    'Necrons',
    'Orks',
    'Servants of the Abyss',
    'T\'au Empire',
    'Thousand Sons',
    'Tyranids',
    "Garrek's Reavers",
    "Steelheart's Champions",
    "Sepulchral Guard",
    "Ironskull's Boyz",
    "The Chosen Axes",
    "Spiteclaw's Swarm",
    "The Farstriders",
    "Magore's Fiends",
    "Stormsire's Cursebreakers",
    "Thorns of the Brian Queen",
    "Eyes of the Nine",
    "Zarbag's Gitz",
    "Mollog's Mob",
    "Godsworn Hunt",
    "Thundrik's Profiteers",
    "Ylthari's Guardians",
    'Imperial Knights',
    'Chaos Knights',
    'Demons',
    'Dark Mechanicus',
    'Fallen',
    'Space Wolves',
    'Dark Angels',
    'Adepta Sororitas',
    'Blood Angels',
  ]

  validates :faction, :team_name, presence: true
  validates :team_name, uniqueness: true, length: { maximum: 40 }
  validates :faction, :inclusion=> { :in => FACTION_LIST }
  validates :user_id, uniqueness: { scope: [:faction],
   message: 'already has a team in this faction' }

  belongs_to :user

  belongs_to :ladder,
    class_name: :Ladder,
    foreign_key: :ladder_name,
    primary_key: :name

  has_many :matchups,
    dependent: :destroy

  after_initialize :add_start_points, if: :new_record?

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
    all_matches = self.matchups.where(season: Season.last.season)
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

end
