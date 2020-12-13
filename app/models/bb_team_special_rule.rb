# == Schema Information
#
# Table name: bb_team_special_rules
#
#  id                  :bigint           not null, primary key
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  bb_special_rule_id  :integer          not null
#  bb_team_template_id :integer          not null
#


class BbTeamSpecialRule < ApplicationRecord

end
