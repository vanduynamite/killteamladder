# == Schema Information
#
# Table name: bb_team_templates
#
#  id          :bigint           not null, primary key
#  apothecary  :boolean          default(FALSE), not null
#  reroll_cost :integer          not null
#  tier        :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  faction_id  :integer          not null
#


class BbTeamTemplate < ApplicationRecord

end
