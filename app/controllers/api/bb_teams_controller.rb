
class Api::BbTeamsController < ApplicationController

  def show
    @team = Team.find(params[:id])
    @team_id = @team.id
    @bb_team = @team.bb_team
    @players = BbPlayer.includes(
      :primary_skill_groups,
      :secondary_skill_groups,
      :skill_links,
      :skills,
    ).where(team: @team)
    @templates = BbPlayerTemplate.includes(
      :primary_skill_groups,
      :secondary_skill_groups,
      :skill_links,
      :skills,
    ).where(team_template: @bb_team.team_template)

    render 'api/bb_teams/show.json.jbuilder'
  end

end
