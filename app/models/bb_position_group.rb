# == Schema Information
#
# Table name: bb_position_groups
#
#  id                          :bigint           not null, primary key
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  bb_player_template_id       :integer          not null
#  bb_position_group_limits_id :integer          not null
#


class BbPositionGroup < ApplicationRecord

end
