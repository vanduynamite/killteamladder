# == Schema Information
#
# Table name: bb_player_skill_groups
#
#  id                    :bigint           not null, primary key
#  primary               :boolean          default(FALSE), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  bb_player_template_id :integer          not null
#  bb_skill_group_id     :integer          not null
#


class BbPlayerSkillGroup < ApplicationRecord

end
