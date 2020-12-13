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

end
