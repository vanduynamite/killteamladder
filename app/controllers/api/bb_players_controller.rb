
class Api::BbPlayersController < ApplicationController

  def create
    # accepts data with team_id: and template_id:

    # returns the same as bb_teams.show
    # or returns errors
  end

  def update
    # accepts player with :name and :number

    # returns json: [teamId, ladder]
  end

  def show
    @player = BbPlayer.find_by(id: params[:id])

    # returns this single player with details view...which means what exactly?
  end

  private

  def player_params
    params.require(:player).permit(
      :team_id,
      :template_id,
      :name,
      :number,
    )
  end

end
