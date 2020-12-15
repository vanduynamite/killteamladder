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

  belongs_to :group_limit,
    class_name: :BbPositionGroupLimit,
    foreign_key: :bb_position_group_limits_id

  def max
    group_limit.max
  end

  def grouped_player_template_ids
    BbPositionGroup.where(
      bb_position_group_limits_id: self.bb_position_group_limits_id)
      .pluck(:bb_player_template_id)
  end

end
