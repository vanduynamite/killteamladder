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
  validates_with CanTeamAffordNewPlayer, if: :new_record?

  validates :ma_improvement, :st_improvement, :ag_improvement, :pa_improvement,
    :av_improvement, numericality: { less_than_or_equal_to: 2,
    message: "cannot be improved more than twice"}
  validates :number, uniqueness: { scope: [:team_id] },
    numericality: { less_than: 21, message: "is too high" }

  belongs_to :team
  has_one :bb_team, through: :team
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

  has_many :advancement_links,
    class_name: :BbPlayerAdvancement,
    foreign_key: :bb_player_id

  has_many :advancements, through: :advancement_links, source: :advancement

  before_create :transfer_data_from_template
  after_create :after_create_tasks

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

  def after_create_tasks
    add_skills_from_template
    update_team_treasury_and_value
  end

  def add_skills_from_template
    self.player_template.skill_links.each do |s|
      skill_link = BbPlayerSkill.new
      skill_link.player = self
      skill_link.skill = s.skill
      skill_link.modifier = s.modifier
      skill_link.save
    end
  end

  def update_team_treasury_and_value
    treasury = bb_team.treasury
    bb_team.update(treasury: treasury - self.hiring_fee)
    bb_team.update_team_value!
  end

  # TODO: add in injuries when doing match events
  def ma
    self.ma_original + self.ma_improvement
  end

  def st
    self.st_original + self.st_improvement
  end

  def ag
    self.ag_original + self.ag_improvement
  end

  def pa
    self.pa_original + self.pa_improvement
  end

  def av
    self.av_original + self.av_improvement
  end

  def available_primary_skills
    primary_skills.where.not(id: skills.pluck(:id))
  end

  def available_secondary_skills
    secondary_skills.where.not(id: skills.pluck(:id))
  end

  def primary_skill_group_string
    psg_string = ""
    primary_skill_groups.pluck(:name).sort.each { |sg| psg_string << sg[0] }
    return psg_string
  end

  def secondary_skill_group_string
    ssg_string = ""
    secondary_skill_groups.pluck(:name).sort.each { |sg| ssg_string << sg[0] }
    return ssg_string
  end

  def skill_string
    skill_str = ""
    skill_arr = skills.pluck(:name, :modifier, :must_use)
    skill_arr.each_with_index do |skill, i|
      skill_str << skill[0]
      skill_str << "(" + skill[1] + ")" if skill[1]
      skill_str << "*" if skill[2]
      skill_str << ", " unless i == skill_arr.size - 1
    end
    return skill_str
  end

end
