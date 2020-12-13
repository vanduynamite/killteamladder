# == Schema Information
#
# Table name: bb_skills
#
#  id                :bigint           not null, primary key
#  description       :text
#  must_use          :boolean          default(FALSE), not null
#  name              :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  bb_skill_group_id :integer          not null
#


class BbSkill < ApplicationRecord

  belongs_to :group,
    class_name: :BbSkillGroup,
    foreign_key: :bb_skill_group_id

  has_many :player_links, class_name: :BbPlayerTemplateSkill
  has_many :player_templates, through: :player_links, source: :player_template

end
