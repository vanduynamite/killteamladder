# == Schema Information
#
# Table name: bb_skill_groups
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class BbSkillGroup < ApplicationRecord

  has_many :skills,
    class_name: :BbSkill,
    foreign_key: :bb_skill_group_id

end
