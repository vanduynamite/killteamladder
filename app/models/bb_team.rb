# == Schema Information
#
# Table name: bb_teams
#
#  id                 :bigint           not null, primary key
#  apothecaries       :integer          default(0), not null
#  assistant_coaches  :integer          default(0), not null
#  cheerleaders       :integer          default(0), not null
#  current_team_value :integer          default(0), not null
#  dedicated_fans     :integer          default(1), not null
#  rerolls            :integer          default(0), not null
#  team_value         :integer          default(0), not null
#  treasury           :integer          default(1000000), not null
#  team_id            :integer          not null
#


class BbTeam < ApplicationRecord
  validates :dedicated_fans, numericality: { greater_than: 0, less_than: 7,
    message: "must be between 0 and 6"}
  validates :rerolls, numericality: { greater_than_or_equal_to: 0, less_than: 9,
    message: "must be between 0 and 8" }

  belongs_to :team
  has_one :faction, through: :team, source: :faction_record
  has_one :team_template, through: :faction, source: :bb_team_template

  has_many :player_templates, through: :team_template
  has_many :special_rules, through: :team_template


  def calculate_team_value
    self.team_value = self.team_value
  end

  def calculate_current_team_value
    self.current_team_value = self.current_team_value
  end

end
