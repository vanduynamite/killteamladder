# == Schema Information
#
# Table name: bb_players
#
#  id                    :bigint           not null, primary key
#  team_id               :integer          not null
#  number                :integer          not null
#  name                  :string           not null
#  bb_player_template_id :integer          not null
#  position_name         :string           not null
#  current_value         :integer          not null
#  hiring_fee            :integer          not null
#  ma_original           :integer          not null
#  st_original           :integer          not null
#  ag_original           :integer          not null
#  pa_original           :integer          not null
#  av_original           :integer          not null
#  mng                   :boolean          default(FALSE), not null
#  ni                    :integer          default(0), not null
#  spp                   :integer          default(0), not null
#  ma_improvement        :integer          default(0), not null
#  st_improvement        :integer          default(0), not null
#  ag_improvement        :integer          default(0), not null
#  pa_improvement        :integer          default(0), not null
#  av_improvement        :integer          default(0), not null
#  temporarily_retired   :boolean          default(FALSE), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#


class BbPlayer < ApplicationRecord
  validates_with PositionLimitValidator
  validates :ma_improvement, :st_improvement, :ag_improvement, :pa_improvement,
    :av_improvement, numericality: { less_than_or_equal_to: 2,
    message: "cannot be improved more than twice"}
  validates :number, uniqueness: { scope: [:team_id] }

  belongs_to :team
  belongs_to :player_template,
    class_name: :BbPlayerTemplate,
    foreign_key: :bb_player_template_id

  has_one :faction, through: :team, source: :faction_record
  has_one :team_template, through: :faction, source: :bb_team_template

  before_create :update_from_template

  def update_from_template
    # must come in with team_id, name, number, template_id

    t = self.player_template

    self.position_name = t.position_name
    self.hiring_fee = t.cost
    self.current_value = t.cost
    self.ma_original = t.ma
    self.st_original = t.st
    self.ag_original = t.ag
    self.pa_original = t.pa
    self.av_original = t.av

    # defaults, so the validation doesn't get sad
    # self.ma_improvement = 0
    # self.st_improvement = 0
    # self.ag_improvement = 0
    # self.pa_improvement = 0
    # self.av_improvement = 0
  end

  def ma
    return self.ma_original + self.ma_improvement
  end

  def st
    return self.st_original + self.st_improvement
  end

  def ag
    return self.ag_original + self.ag_improvement
  end

  def pa
    return self.pa_original + self.pa_improvement
  end

  def av
    return self.av_original + self.av_improvement
  end
  
end

#
# class GoodnessValidator < ActiveModel::Validator
#   def validate(record)
#     if record.first_name == "Evil"
#       record.errors.add :base, "This person is evil"
#     end
#   end
# end
#
# class Person < ApplicationRecord
#   validates_with GoodnessValidator
# end
