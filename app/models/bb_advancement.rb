# == Schema Information
#
# Table name: bb_advancements
#
#  id                :bigint           not null, primary key
#  name              :string           not null
#  primary_skill     :boolean          default(FALSE), not null
#  random            :boolean          default(FALSE), not null
#  rank              :integer          not null
#  spp_cost          :integer          not null
#  stat_upgrade      :boolean          default(FALSE), not null
#  value_increase    :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  requires_skill_id :boolean          default(FALSE), not null
#


class BbAdvancement < ApplicationRecord

end
