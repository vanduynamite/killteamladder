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
    'Necrons',
    'Orks',
    'Servants of the Abyss',
    'T\'au Empire',
    'Thousand Sons',
    'Tyranids',
    'ass-deptus ass-farties',
  ]

  validates :faction, :team_name, presence: true
  validates :team_name, uniqueness: true, length: { maximum: 40 }
  validates :faction, :inclusion=> { :in => FACTION_LIST }

  belongs_to :user

end
