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
  validates :faction, :team_name, presence: true
  validates :team_name, uniqueness: true, length: { maximum: 20 }

  belongs_to :user

end
