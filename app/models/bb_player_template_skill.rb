# == Schema Information
#
# Table name: bb_player_template_skills
#
#  id                    :bigint           not null, primary key
#  modifier              :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  bb_player_template_id :integer          not null
#  bb_skill_id           :integer          not null
#


class BbPlayerTemplateSkill < ApplicationRecord

  belongs_to :player_template,
    class_name: :BbPlayerTemplate,
    foreign_key: :bb_player_template_id

  belongs_to :skill,
    class_name: :BbSkill,
    foreign_key: :bb_skill_id

end
