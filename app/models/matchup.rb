# == Schema Information
#
# Table name: matchups
#
#  id           :bigint(8)        not null, primary key
#  team_id      :integer          not null
#  start_points :integer          not null
#  end_points   :integer          not null
#  result       :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  matchup_id   :integer
#  season       :integer          default(1), not null
#

class Matchup < ApplicationRecord
  SEASON = 1

  WIN_POINTS = 6
  TIE_POINTS = 3
  LOSS_POINTS = 2

  RESULTS = [-1, 0, 1]

  validates :team_id, :start_points, :end_points, :result, presence: true
  validates :result, :inclusion=> { :in => RESULTS }

  has_one :opposite,
    class_name: :Matchup,
    foreign_key: :matchup_id

  has_one :opponent,
    through: :opposite,
    source: :team

  belongs_to :team,
    class_name: :Team,
    foreign_key: :team_id

  after_initialize :add_start_points, :add_season

  def add_start_points
    self.start_points = self.team.points
  end

  def add_season
    self.season = SEASON
  end

  def calculate_end_points!
    if self.result == 1
      point_change = calculate_win
    elsif self.result == -1
      point_change = calculate_loss
    else
      point_change = calculate_tie
    end

    self.end_points = self.start_points + point_change
  end

  def calculate_win
    point_diff = [(self.opposite.start_points - self.start_points), 0].max
    point_xfer = (point_diff + 1) / 2
    WIN_POINTS + point_xfer
  end

  def calculate_loss
    point_diff = [(self.start_points - self.opposite.start_points), 0].max
    point_xfer = (point_diff + 1) / 2
    LOSS_POINTS - point_xfer
  end

  def calculate_tie
    point_diff = (self.opposite.start_points - self.start_points)
    point_xfer = ((point_diff) / 4.0).round
    TIE_POINTS + point_xfer
  end

  def self.season
    SEASON
  end

end
