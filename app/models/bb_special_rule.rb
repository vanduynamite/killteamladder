# == Schema Information
#
# Table name: bb_special_rules
#
#  id          :bigint           not null, primary key
#  description :text
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#


class BbSpecialRule < ApplicationRecord

end
