
class Api::TeamsController < ApplicationController

  def create
    return false unless authorized_user?

    @user = current_user
    @team = @user.teams.new(team_params)

    if @team.save
      render 'api/teams/create.json.jbuilder'
    else
      render json: @team.errors.full_messages, status: 422
    end

  end

  def index
    @teams = Team.all.includes!(:user)

    render 'api/teams/index.json.jbuilder'
  end

  def show
    @team = Team.includes(:matchups).find_by(id: params[:id])
    @matchups = @team.matchups.includes(:opposite_matchup)
    @teams = Team.all
    @users = User.all

    if @team
      render 'api/teams/show.json.jbuilder', status: 200
    else
      render json: ['Team not found.'], status: 404
    end

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
