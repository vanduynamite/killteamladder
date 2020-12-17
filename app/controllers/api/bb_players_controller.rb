
class Api::FactionsController < ApplicationController

  def create

  end

  def update

  end

  def show
    @player = BbPlayer.find_by(id: params[:id])

    # render nothing_right_now!
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
