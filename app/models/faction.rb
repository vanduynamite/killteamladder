# == Schema Information
#
# Table name: factions
#
#  id           :bigint           not null, primary key
#  faction_name :string           not null
#  ladder_name  :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#


class Faction < ApplicationRecord
  validates :faction_name, presence: true
  validates :faction_name, uniqueness: { scope: [:ladder_name]}

  belongs_to :ladder,
    class_name: :Ladder,
    foreign_key: :ladder_name,
    primary_key: :name

end
