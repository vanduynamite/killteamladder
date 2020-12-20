
class Api::BbTeamsController < ApplicationController

  def show
    @team = Team.find(params[:id])
    @team_id = @team.id
    @players = @team.bb_team.players
    @templates = @team.bb_team.player_templates

    render 'api/bb_teams/show.json.jbuilder'
  end

end
