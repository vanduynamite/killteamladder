
class Api::TeamsController < ApplicationController

  def create
    return false unless authorized_user?

    @user = current_user
    @team = @user.teams.new(team_params)

    if @team.save
      render 'api/teams/show.json.jbuilder'
    else
      render json: @team.errors.full_messages, status: 422
    end

  end

  def index
    @teams = Team.all.includes!(:user)

    render 'api/teams/index.json.jbuilder'
  end

  def show

  end

  def update

  end

  private

  def team_params
    params.require(:team).permit(
      :faction,
      :team_name,
      :active,
    )
  end

end
