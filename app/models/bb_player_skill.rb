# == Schema Information
#
# Table name: bb_player_skills
#
#  id           :bigint           not null, primary key
#  modifier     :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  bb_player_id :integer          not null
#  bb_skill_id  :integer          not null
#


class BbPlayerSkill < ApplicationRecord
  validates :bb_player_id, uniqueness: { scope: [:bb_skill_id],
    message: "already has this skill"  }

  belongs_to :player,
    class_name: :BbPlayer,
    foreign_key: :bb_player_id

  belongs_to :skill,
    class_name: :BbSkill,
    foreign_key: :bb_skill_id

end
