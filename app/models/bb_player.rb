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
  validates_with PositionLimitValidator, if: :new_record?
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

  has_many :primary_skill_groups,
    through: :player_template,
    source: :primary_skill_groups

  has_many :primary_skills,
    through: :primary_skill_groups,
    source: :skills

  has_many :secondary_skill_groups,
    through: :player_template,
    source: :secondary_skill_groups

  has_many :secondary_skills,
    through: :secondary_skill_groups,
    source: :skills

  has_many :skill_links, class_name: :BbPlayerSkill, dependent: :destroy
  has_many :skills, through: :skill_links, source: :skill

  before_create :transfer_data_from_template
  after_create :add_skills_from_template

  def transfer_data_from_template
    # must come in with team_id, name, number, template_id
    template = BbPlayerTemplate.find(self.bb_player_template_id)

    self.position_name = template.position_name
    self.hiring_fee = template.cost
    self.current_value = template.cost
    self.ma_original = template.ma
    self.st_original = template.st
    self.ag_original = template.ag
    self.pa_original = template.pa
    self.av_original = template.av
  end

  def add_skills_from_template
    self.player_template.skill_links.each do |s|
      skill_link = BbPlayerSkill.new
      skill_link.player = self
      skill_link.skill = s.skill
      skill_link.modifier = s.modifier
      skill_link.save
    end

    # TODO Update the team treasury and value too
  end

  def ma
    # TODO: add in injuries
    self.ma_original + self.ma_improvement
  end

  def st
    # TODO: add in injuries
    self.st_original + self.st_improvement
  end

  def ag
    # TODO: add in injuries
    self.ag_original + self.ag_improvement
  end

  def pa
    # TODO: add in injuries
    self.pa_original + self.pa_improvement
  end

  def av
    # TODO: add in injuries
    self.av_original + self.av_improvement
  end

  def available_primary_skills
    primary_skills.where.not(id: skills.pluck(:id))
  end

  def available_secondary_skills
    secondary_skills.where.not(id: skills.pluck(:id))
  end

  def skill_modifiers
    # returns an array
    skills.pluck(:modifier)
  end

end
