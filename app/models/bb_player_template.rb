# == Schema Information
#
# Table name: bb_player_templates
#
#  id                  :bigint           not null, primary key
#  ag                  :integer          not null
#  av                  :integer          not null
#  cost                :integer          not null
#  ma                  :integer          not null
#  max_allowed         :integer          not null
#  pa                  :integer
#  position_name       :string           not null
#  st                  :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  bb_team_template_id :integer          not null
#


class BbPlayerTemplate < ApplicationRecord

  has_many :primary_skill_group_links, -> {where primary: true},
    class_name: :BbPlayerSkillGroup,
    foreign_key: :bb_player_template_id

  has_many :primary_skill_groups,
    through: :primary_skill_group_links,
    source: :skill_group

  has_many :secondary_skill_group_links, -> {where primary: false},
    class_name: :BbPlayerSkillGroup,
    foreign_key: :bb_player_template_id

  has_many :secondary_skill_groups,
    through: :secondary_skill_group_links,
    source: :skill_group

  belongs_to :team_template,
    class_name: :BbTeamTemplate,
    foreign_key: :bb_team_template_id

  has_many :skill_links, class_name: :BbPlayerTemplateSkill
  has_many :skills, through: :skill_links, source: :skill

  has_one :position_group,
    class_name: :BbPositionGroup,
    foreign_key: :bb_player_template_id

  def group_max_allowed
    if position_group
      return position_group.max
    else
      return nil
    end
  end

end
