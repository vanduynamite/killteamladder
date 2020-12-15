# == Schema Information
#
# Table name: bb_position_group_limits
#
#  id         :bigint           not null, primary key
#  max        :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class BbPositionGroupLimit < ApplicationRecord

end
