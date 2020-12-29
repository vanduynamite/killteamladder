# == Schema Information
#
# Table name: bb_player_advancements
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  bb_advancement_id :integer          not null
#  bb_player_id      :integer          not null
#  bb_skill_id       :integer
#


class BbPlayerAdvancement < ApplicationRecord

  belongs_to :player,
    class_name: :BbPlayer,
    foreign_key: :bb_player_id

  belongs_to :advancement,
    class_name: :BbAdvancement,
    foreign_key: :bb_advancement_id

end
