
class Api::TeamsController < ApplicationController

  def create
    return false unless authorized_user?

    @user = current_user
    @team = @user.teams.new(team_params)
    @rankings = get_rankings(@team.ladder_name)

    if @team.ladder_name == '/40k' && !@user.authorized_2020_league
      render json: ['You are not signed up for the 2020 40K league. Please contact Nick De Veaux.'], status: 401
      return
    end

    if @team.save
      render 'api/teams/create.json.jbuilder'
    else
      render json: @team.errors.full_messages, status: 422
    end

  end

  def index
    @teams = Team.where(ladder_name: params[:ladder]).includes(:user)
    @rankings = get_rankings(params[:ladder])

    render 'api/teams/index.json.jbuilder'
  end

  def show
    @team = Team.includes(:matchups).find_by(id: params[:id])
    @matchups = @team.matchups.includes(:opposite_matchup)
    @teams = Team.where(ladder_name: @team.ladder_name)
    @users = User.all
    @rankings = get_rankings(@team.ladder_name)

    if @team
      render 'api/teams/show.json.jbuilder', status: 200
    else
      render json: ['Team not found.'], status: 404
    end

  end

  def update
    @team = Team.find_by(id: params[:id])
    return false unless authorized_user?(@team.user_id)

    @team.team_name = team_params[:team_name]
    @team.active = team_params[:active] if team_params[:active]

    if @team.save
      render json: [@team.id, @team.ladder_name], status: 200
    else
      render @team.errors.full_messages, status: 422
    end


  end

  private

  def team_params
    params.require(:team).permit(
      :faction,
      :team_name,
      :active,
      :ladder_name,
    )
  end

end
