# == Schema Information
#
# Table name: seasons
#
#  id          :bigint           not null, primary key
#  ladder_name :string
#  season      :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Season < ApplicationRecord
  validates :season, uniqueness: { scope: [:ladder_name] , message: 'already exists in this ladder'}
  validates :ladder_name, presence: true

  after_save :reset_teams

  def reset_teams
    Team.where(active: true, ladder_name: self.ladder_name).update_all("points = 1000")
  end

end
