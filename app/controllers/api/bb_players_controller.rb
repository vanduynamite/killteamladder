
class Api::BbPlayersController < ApplicationController

  def create
    @team = Team.find(player_params[:team_id])
    return false unless authorized_user?(@team.user_id)

    templates = @team.bb_team.player_templates
    template = BbPlayerTemplate.find(player_params[:bb_player_template_id])

    if !templates.include?(template)
      render json: ["This team does not allow this position"], status: 422
      return
    end

    @player = BbPlayer.new(
      name: player_params[:name],
      number: player_params[:number],
      team_id: player_params[:team_id],
      bb_player_template_id: player_params[:bb_player_template_id],
    );

    if @player.save
      render 'api/bb_players/show.json.jbuilder', status: 200
    else
      render json: @player.errors.full_messages, status: 422
    end
  end

  def update
    @player = BbPlayer.find(params[:id])
    @team = @player.team
    return false unless authorized_user?(@player.team.user_id)

    @player.name = player_params[:name]
    @player.number = player_params[:number]

    if @player.save
      render 'api/bb_players/show.json.jbuilder', status: 200
    else
      render json: @player.errors.full_messages, status: 422
    end
  end

  def show
    @player = BbPlayer.find_by(id: params[:id])

    render 'api/bb_players/show.json.jbuilder', status: 200
  end

  private

  def player_params
    params.require(:player).permit(
      :id,
      :team_id,
      :bb_player_template_id,
      :name,
      :number,
    )
  end

end
