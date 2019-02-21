# == Schema Information
#
# Table name: seasons
#
#  id         :bigint(8)        not null, primary key
#  season     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Season < ApplicationRecord
  validates :season, uniqueness: true

  after_save :reset_teams

  def reset_teams
    # Team.where(active: true).update_all("points = 1000")
  end

end
