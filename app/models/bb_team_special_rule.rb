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

  belongs_to :team,
    class_name: :BbTeamTemplate,
    foreign_key: :bb_team_template_id

  belongs_to :special_rule,
    class_name: :BbSpecialRule,
    foreign_key: :bb_special_rule_id

end
