# == Schema Information
#
# Table name: bb_team_templates
#
#  id          :bigint           not null, primary key
#  apothecary  :boolean          default(FALSE), not null
#  reroll_cost :integer          not null
#  tier        :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  faction_id  :integer          not null
#


class BbTeamTemplate < ApplicationRecord

  has_many :special_rule_links, class_name: :BbTeamSpecialRule
  has_many :special_rules, through: :special_rule_links, source: :special_rule

  has_many :player_templates, class_name: :BbPlayerTemplate

  belongs_to :faction

  def name
    return self.faction.faction_name
  end

end
