# == Schema Information
#
# Table name: bb_advancements
#
#  id             :bigint           not null, primary key
#  name           :string           not null
#  rank           :integer          not null
#  spp_cost       :integer          not null
#  value_increase :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#


class BbAdvancement < ApplicationRecord

end
